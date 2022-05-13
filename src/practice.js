import logo from './logo.svg';
import './App.css';
import {useState} from 'react'; // useState라는 훅. 훅: 리액트에서 제공하는 기본적인 함수

// 사용자 정의 태그 = 컴포넌트
function Article(props){
  return <article>
    <h3>{props.title} </h3>
      {props.body}
  </article>
}

function Header(props){
  return <header>
    <h1><a href="/" onClick={function(event){
      event.preventDefault(); // a태그가 동작하는 기본 동작을 방지. = 클릭해도 reload가 일어나지 않음.
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = [ ]

  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}> 
      <a id ={t.id} href={'read/'+t.id} onClick={(event)=>{
        event.preventDefault(); // a태그를 눌렀을 때 동작하지 않게 하기 위해
        props.onChangeMode(event.target.id);
      }}>{t.title}</a>
    </li>)
  }

  return <nav>
  <ol>
    {lis}        
  </ol>
</nav>
}


//
function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];

  // 위 세 줄을 축약하자면
  const [mode, setMode] = useState('WELCOME');
  //console.log('_mode', _mode);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]
  let content = null;

  if(mode ==='WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    content = <Article title="Read" body="Hello, Read"></Article>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={function(){
        setMode('WELCOME');
      }}></Header>  

      <Nav topics={topics} onChangeMode={(id)=>{
        setMode('READ'); // App 컴포넌트가 다시 실행됨
      }}></Nav>   

      {content}

    </div>
  );
}

export default App;
