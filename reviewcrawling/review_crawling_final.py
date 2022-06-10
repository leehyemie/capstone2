#url 바탕으로 리뷰 크롤링

import pandas as pd 
from selenium import webdriver 
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException 
import time 
import re 
from bs4 import BeautifulSoup 
import json
from datetime import datetime
from dateutil.relativedelta import relativedelta

options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])

driver = webdriver.Chrome("C:/Users/Jongwan/chromedriver.exe", chrome_options = options)


#데이터 불러오기
df = pd.read_csv('C:\\Users\\Jongwan\\pythonnn\\입력.csv')

# url 이 없는 곳 빈공백 제거
df['naver_map_url'] = df['naver_map_url'].fillna(777)

rating_list = [] 


now=datetime.today()
before_one_month = now - relativedelta(months=1)
nownow = now.strftime('%Y-%m-%d')
beforebefore = before_one_month.strftime('%Y-%m-%d')



for i in range(len(df)):

    print('====================')
    print(str(i)+'번째 식당')

    thisurl = df['naver_map_url'][i]
    if df['naver_map_url'][i] == 777:
        print('해당 리뷰 url을 찾지 못했습니다.')
        continue

#최신 한달 리뷰 개수, 네이버 블로그 기준
    month_review_url = 'https://section.blog.naver.com/Search/Post.naver?pageNo=1&rangeType=MONTH&orderBy=sim&startDate='+beforebefore+'&endDate='+nownow+'&keyword='+df['업소명'][i]
    driver.get(month_review_url)
    time.sleep(1)
    month_review = driver.find_element_by_xpath('/html/body/ui-view/div/main/div/div/section/div[1]/div[2]/span/span/em').text

    
    driver.get(df['naver_map_url'][i])
    thisurl = df['naver_map_url'][i]
    time.sleep(1)
    a=0
#더보기 작업
    #더보기 click으로 진행시 오류 발생, 리뷰 데이터 많을시 오류 발생(제한)
    while a<입력:
        a=a+1
        try:
                driver.find_element_by_tag_name('body').send_keys(Keys.END)
                time.sleep(1)
                driver.find_element_by_tag_name('body').send_keys(Keys.PAGE_UP)
                driver.find_element_by_xpath('/html/body/div[3]/div/div/div/div[7]/div[2]/div[3]/div[2]/a').send_keys(Keys.ENTER)
                print('더보기누름')


        except NoSuchElementException:
            print('더이상 표시할게 없다.')
            time.sleep(0.5)
            break

    
    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    time.sleep(0.5)

#파일별로 기준 주의
    restaurant_name = df['업소명'][i]
    restaurnat_location = df['도로명 주소 '][i]
    print('식당 이름 :'+restaurant_name)


# restaurant_classification = 네이버 지도로 검색시에 뜨는 값을 받아옴(식당종류, 메뉴)
    try:
        restaurant_classificaton = soup.find_all('span',attrs = {'class':'_3ocDE'})[0].text
        print('restaurant_classificaton', restaurant_classificaton)
    except:
        restaurant_classificaton = 'none'
        
    print('식당 구분 :'+restaurant_classificaton)
    print('------------------------------------')

    try:
        one_review = soup.find_all('li', attrs = {'class':'_3l2Wz'}) 
        review_num = len(one_review)

        print('총 리뷰 개수 : '+str(review_num))

#유저 정보와 리뷰 내용
        for i in range(len(one_review)):
            user_url = one_review[i].find('div', attrs = {'class':'_1orw_'}).find('a').get('href') 
            print('user url =', user_url)
            user_code = re.findall(r"my/(\w+)", user_url)[0] 
            print('user_code = '+user_code) 
            res_code = re.findall(r"restaurant/(\d+)", thisurl)[0] 
            review_id = str(res_code)+"_"+user_code 
            print('review_id = '+review_id) 
            try:
                review_content = one_review[i].find('span', attrs = {'class':'WoYOw'}).text 
            except:
                review_content = '' 
            
            print('리뷰내용 :'+review_content)

            naver_reivew = restaurant_name, restaurant_classificaton, review_content, restaurnat_location, month_review
            rating_list.append(naver_reivew)


    except NoSuchElementException:
        none_review = "네이버 리뷰 없음"
        print(none_review)


    rating_df = pd.DataFrame(rating_list) 

#파일명 입력
    rating_df.columns = ['업소명','주요메뉴', '리뷰', '위치', '최근 한달간 블로그 리뷰 개수'] 
    rating_df.to_csv('입력.csv', encoding='utf-8-sig', index=False)  

