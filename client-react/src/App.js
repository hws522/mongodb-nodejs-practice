import React, { useEffect, useState } from "react";
import "./App.css";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch, Input, Card, Row, Col, Button, Form } from "antd";

export default function App() {
  const [form] = Form.useForm();
  const [isDarkMode, setIsDarkMode] = React.useState();
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();
  const { TextArea } = Input;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  const onChangeTitle = (e) => {
    // console.log('제목:', e.target.value);
    setTitle(e.target.value);
  };
  const onChangeContents = (e) => {
    // console.log('내용:', e.target.value);
    setContent(e.target.value);
  };

  if (status === "loading") {
    return null;
  }

  const setTitleContent = () => {
    console.log(title, content);
  }

  return (
    <>
      <Row align="center">
        <Col span={24}>
          <div className="main fade-in">
            <Switch checked={isDarkMode} onChange={toggleTheme} />
          </div>
        </Col>
        <Col span={8}>
          <Card>
            <Input placeholder="제목 입력하기" allowClear onChange={onChangeTitle} />
            <br />
            <br />
            <TextArea placeholder="내용 입력하기" showCount maxLength={100} style={{ height: 120, marginBottom: 30 }} onChange={onChangeContents} />
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button type="dashed" style={{ marginRight: 10 }}>취소</Button>
              <Button type="primary" onClick={setTitleContent}>저장</Button>
            </div>
          </Card>
        </Col>
        <Col push={1} span={8}>
          <Card title="Card title" bordered style={{ width: 300, boxShadow: '10px 5px 5px white' }}>
          </Card>
        </Col>
      </Row>
    </>
  );
}