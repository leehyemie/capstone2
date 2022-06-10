

from bs4 import BeautifulSoup
from urllib.request import urlopen
import json
import time
import re
import csv
import pandas as pd
from urllib.error import HTTPError
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import ElementNotVisibleException



options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])


naver_url = "https://map.naver.com/"

#읽어올 파일 설정
df = pd.read_csv('C:\\Users\\Jongwan\\pythonnn\\', encoding='cp949') 
df['naver_map_url'] = '' 
driver = webdriver.Chrome("C:/Users/Jongwan/chromedriver.exe", chrome_options = options)


for i, keyword in enumerate(df['업소명'].tolist()): 
    print("이번에 찾을 키워드 :", i, f"/ {df.shape[0]} 행", keyword) 
    
    store_name = keyword
    

    try: 
        naver_map_search_url = f'https://map.naver.com/v5/search/{keyword}+/place'
        #검색 url

        driver.get(naver_map_search_url) 

        time.sleep(0.8) 
        try:
            driver.switch_to.frame('searchIframe')
            time.sleep(0.5)
            click1 = driver.find_element_by_xpath('/html/body/div[3]/div/div/div[1]/ul/li[1]/div[2]/a[1]/div/div/span[1]')
            click2 = driver.find_element_by_xpath('/html/body/div[3]/div/div/div[1]/ul/li[2]/div[2]/a[1]/div/div/span[1]')
            if store_name in click1.text:

                click1.click()
                time.sleep(0.5)
                driver.switch_to.parent_frame()
                time.sleep(0.5)
        
            elif store_name in click2.text:
                click2.click()
                time.sleep(0.5)
                driver.switch_to.parent_frame()
        
            else:
                print("해당 음식점이 없다")
                driver.switch_to.parent_frame()
                time.sleep(0.5)
                continue

        except:
            
            driver.switch_to.parent_frame()

        curl = driver.current_url 
 
        time.sleep(1)
        restaurant_number = re.findall(r"place/(\d+)", curl) 
        print('restaurant_number', restaurant_number)
        final_url = 'https://pcmap.place.naver.com/restaurant/'+restaurant_number[0]+'/review/visitor#' 
        print(final_url) 
        df['naver_map_url'][i]=final_url

    except IndexError: 
        df['naver_map_url'][i]= '' 
        print('none') 
        
    #저장할 파일명 설정
    df.to_csv('입력', encoding = 'utf-8-sig')
