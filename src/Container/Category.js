import React, { useState } from "react";

const Check = () => {
  const formData = [
    { id: 1, name: "한식" },
    { id: 2, name: "일식" },
    { id: 3, name: "중식" },
    { id: 4, name: "기타" }
  ];

  const [isChecked, setIsChecked] = useState(false); //체크 여부
  const [checkedItems, setCheckedItems] = useState(new Set());//체크된 요소들

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode, target.value, target.checked);
  };

  const checkedItemHandler = (box, id, isChecked) => {
    if (isChecked) { //체크 되었을때
      checkedItems.add(id); //체크시 삽입
      setCheckedItems(checkedItems); //체크 요소 넣어주기
      box.style.backgroundColor = "#F6CB44"; //스타일 변경
    } else if (!isChecked && checkedItems.has(id)) { //체크가 안되었고, id가 있을때(클릭 2번시)
      checkedItems.delete(id); //체크 두번시 삭제
      setCheckedItems(checkedItems);
      box.style.backgroundColor = "#fff";
    }
    return checkedItems;
  };

  return (
    <div className="contStyle" >
      {formData.map((item) => (
        <label key={item.id} className="innerBox">
          <input
            type="checkbox"
            value={item.name}
            onChange={(e) => checkHandler(e)}
          />
          <div >{item.name }</div>
        </label>
      ))}
    </div>
  );
};

export default Check;