//IMPORTS
import { useState, useEffect } from 'react';
import {deleteExamen, getAllExamens} from "./client";
import {
    Breadcrumb,
    Layout,
    Menu,
    Table,
    Spin,
    Empty,
    Button,
    PageHeader,
    Avatar,
    Card,
    Space,
    Radio,
    Popconfirm } from 'antd';
import {successNotification, errorNotification} from "./Notification"
import { LoadingOutlined, PlusOutlined, EditOutlined, EllipsisOutlined, SettingOutlined  } from '@ant-design/icons';
import './App.css';
import EntryDrawerForm from "./EntryDrawerForm";
const { Header, Content} = Layout;
const { Meta } = Card;

const removeExamen = (examenId, callback) => {
    deleteExamen(examenId).then(() => {
        successNotification("Examen deleted", `Examen with ${examenId} was deleted`);
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [${res.status}] [${res.error}]`
            )
        });
    })
}

const columns = fetchExamens => [ //columns for diary table that is displayed
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Mood',
    dataIndex: 'mood',
    key: 'mood',
  },
  {
      title: 'Q1',
      dataIndex: 'q1',
      key: 'q1',
   },
  {
      title: 'Q2',
      dataIndex: 'q2',
      key: 'q2',
   },
  {
      title: 'Q3',
      dataIndex: 'q3',
      key: 'q3',
  },
  {
       title: 'Q4',
       dataIndex: 'q4',
       key: 'q4',
  },
   {
         title: 'Q5',
         dataIndex: 'q5',
         key: 'q5',
    },
  {
      title: 'Actions',
      key: 'actions',
      render: (text, examen) =>
          <Radio.Group>
              <Popconfirm
                  placement='topRight'
                  title={`Are you sure to delete ${examen.title}`}
                  onConfirm={() => removeExamen(examen.id, fetchExamens)}
                  okText='Yes'
                  cancelText='No'>
                  <Radio.Button value="small">Delete</Radio.Button>
              </Popconfirm>
          </Radio.Group>
  }
];

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

//APP COMPONENT
function App() {
  const [examens, setExamens] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchExamens = () =>
      getAllExamens()
          .then(res => res.json())
          .then(data => {
              console.log(data);
              setExamens(data);
              setFetching(false);
          }).catch(err => {
              console.log(err.response)
              err.response.json().then(res => {
                  console.log(res);
                  errorNotification(
                      "There was an issue",
                      `${res.message} [${res.status}] [${res.error}]`
                  )
              });
          }).finally(() => setFetching(false))



  useEffect(() => {
    console.log("component is mounted");
    if(fetching === true){
        fetchExamens();
    }
  }, []);

  const renderExamens = () => {
    if(fetching){
        return <Spin indicator={antIcon} />;
    }

    if(examens.length <= 0){
        return <>
            <Button type="primary"
                onClick={() => setShowDrawer(!showDrawer)}
                shape="round"
                icon={<PlusOutlined />}
                size="medium"
                style={{ background: "lightblue", borderColor: "gray", color: "black" }}>Add New Entry
            </Button>}
            <EntryDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchExamens={fetchExamens}
            />
            <Empty/>
        </>
    }

    return <>
        <EntryDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchExamens={fetchExamens}
        />
        <Table
            dataSource={examens}
            columns={columns(fetchExamens)}
            bordered
            title={() =>
                <Button type="primary"
                    onClick={() => setShowDrawer(!showDrawer)}
                    shape="round"
                    icon={<PlusOutlined />}
                    size="medium"
                    style={{ background: "lightblue", borderColor: "gray", color: "black" }}>Add New Entry
                </Button>}
            pagination={{ pageSize: 5}}
            scroll={{ y: 240 }}
            rowKey={(examen) => examen.id}
        />;
    </>
  }

    return (
        <Layout
              style={{
                minHeight: '100vh',
              }}
            >
               <PageHeader
                 className="site-page-header"
                 title="Daily Examen"
                 subTitle="Journal your prayerful reflections"
                 style={{backgroundColor: "lightblue"}}
               />
              <Layout className="site-layout">
                <Content
                  style={{
                    margin: '0 16px',
                  }}
                >
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
                 <Card
                     style={{ width: 300, display: "flex", justifyContent: "center"}}
                     cover={
                       <img
                         alt="flowers on journal"
                         src="https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                       />
                     }
                   >
                     <Meta
                       title="What's on your mind?"
                       description="Answer five key questions to reflect on the events of your day."
                     />
                   </Card>
                 </Space>
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: 360,
                    }}
                  >
                    {renderExamens()}
                  </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App;
