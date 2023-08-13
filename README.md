# jiraReport
## 개요
- 프로젝트 / 업무 관리 모니터링 페이지
- 기존의 Jquery / spring / SQL 기반의 시스템의 유지 보수 관리 측면과 기능 개선을 위한 React / Node.js / mongoDB 기반의 발전된 형태의 페이지 개발

## 페이지 구조
App.js
<br/>     ├─ Top.js
<br/>     │   └─ Tab.js
<br/>     │
<br/>     ├─ Middle.js
<br/>     │   ├─ TabPage1.js
<br/>     │   │   ├─ Conditions.js
<br/>     │   │   │   └─ conditions...
<br/>     │   │   │
<br/>     │   │   └─ Contents.js
<br/>     │   │       └─ conditions...
<br/>     │   │
<br/>     │   ├─ TabPage2.js
<br/>     │   ├─ TabPage3.js
<br/>     │   └─ ：：：
<br/>     │
<br/>     └─ Bottom.js

## conditions 공통 구조
~~~html
<div class='jCondition jComponentName horizontal/vertical'>
    <div class='label'><!-- labelText --></div>
    <div class='input'><!-- input tag --></div>
</div>
~~~

## conditions list
|Index|Name|Option [ option( value, defualt: (label) ) ]|Desc|
|:-:|:--|:--|:--|
|1|JMenu|(onTabs, tab)|페이지 작성 영역 (페이지 내부 Tab기능)|
|2|JMenuTab|(value)|페이지 내부 Tab기능|
|3|JTabs||페이지 외부 Tab 기능|
|4|JTab|(value)|Tab 페이지 작성 영역|
|5|JCard|(x, y)|Item Wrapper|
|6|JLabel||라벨 컴포넌트|
|7|JButton|(onClick)|버튼 컴포넌트|
|8|JDate|(type, value, onChange)|날짜 선택 컴포넌트 (멀티 , 싱글)|
|9|JTextField|(onChange, onKeyPress, value)|텍스트 필드 컴포넌트|
|10|JMultiTextField|(value, readOnly)|멀티 라인 텍스트 필드 컴포넌트|
|11|JDropDown|(list, type, placeHolder, disabled)|드롭다운 컴포넌트 (사용 금지 => JDropDown2, JMultiDropDown 컴포넌트로 대체)|
|12|JDropDown2|(list, value, onChange, disabled, uniqueItem, placeHolder)|싱글 선택 드롭다운 컴포넌트|
|13|JMultiDropDown|(list, value, onChange, disabled, uniqueItem, placeHolder)|멀티 선택 드롭다운 컴포넌트|
