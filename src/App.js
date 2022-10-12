import React, { Component } from 'react'; //라이브러리 리액트에서 리액트앱이랑 컴포넌트부분가져와

import './App.css';

export default class App extends Component {
  state = {
    tododata: [],
    value: '',
  };
  btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right',
  };
  getStyle = (completed) => {
    // 리스트 스타일의 경우, 클릭시 줄이 그어지는 동적 작용 필요
    //-> 함수로 짜는게 편함
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none',
      //조건부 삼항 연산자
    };
  };

  handleClick = (id) => {
    // 여기서 쓸 것은 필터 메소드
    //: 주어진 조건을 통과하는 요소들을 모아 새로운 배열로 반환
    let newTodoData = this.state.tododata.filter((data) => data.id !== id);
    this.setState({ tododata: newTodoData });
    // let -> 지역제한 변수, 코틀린은 var이 지역제한인거에 비해
    //여기선 var은 전역변수
    //또, 초기화를 그 구문이 와야 함 -> 코틀린 var이네
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = (e) => {
    //form 안에서 input을 전송할 때, 페이지가 리로드되는 것을 막아줌
    e.preventDefault();
    //할 일 데이터 선언
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };
    this.setState({ tododata: [...this.state.tododata, newTodo], value: '' });
  };
  hadleCompletechange = (id) => {
    let newTodoData = this.state.tododata.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    this.setState({ tododata: newTodoData });
  };
  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1> 할 일 목록</h1>
          </div>
          {this.state.tododata.map((data) => (
            <p>
              <div style={this.getStyle(data.completed)} key={data.id}>
                <input
                  type="checkbox"
                  defaultChecked={false}
                  onChange={() => this.hadleCompletechange(data.id)}
                />
                {data.title}
                <button
                  style={this.btnStyle}
                  onClick={() => this.handleClick(data.id)}
                >
                  del
                </button>
              </div>
            </p>
          ))}

          <form style={{ display: 'flex' }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: '10', padding: '5px' }}
              placeholder="해야 할 일을 입력하세요"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: '1' }}
            />
          </form>
        </div>
      </div>
    );
  }
}
