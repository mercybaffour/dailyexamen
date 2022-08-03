import {Drawer, Input, Col, Select, Form, Row, Button} from 'antd';
import {useState} from 'react';
import {successNotification, errorNotification} from "./Notification";
import {addNewExamen} from "./client";

const {Option} = Select;

function EntryDrawerForm({showDrawer, setShowDrawer, fetchExamens}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();


    const onFinish = examen => {
        console.log(JSON.stringify(examen, null, 2))
        addNewExamen(examen)
             .then(() => {
                console.log("examen added")
                onCLose();
                form.resetFields();
                successNotification(
                    "Examen successfully added",
                    `${examen.title} was added to the system`
                    )
                fetchExamens();
            }).catch(err => {
                console.log(err);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                });
            }).finally(() => {
                setSubmitting(false);
            })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new entry"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form
              form={form}
              layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
             <Row gutter={16}>
                 <Col span={12}>
                     <Form.Item
                         name="mood"
                         label="Please share your overall mood. RED = feeling distressed, distracted, anxious, unsettled, YELLOW = somewhere in between, GREEN = you're feeling good. You're relaxed, focused, excited."
                         rules={[{required: true, message: 'Please select a mood'}]}
                     >
                         <Select placeholder="RED, YELLOW, GREEN">
                             <Option value={0}>RED</Option>
                             <Option value={1}>YELLOW</Option>
                             <Option value={2}>GREEN</Option>
                         </Select>
                     </Form.Item>
                 </Col>
             </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{required: true, message: 'Please enter title'}]}
                    >
                        <Input placeholder="Today's title"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="q1"
                        label="Where did I see God today?"
                        rules={[{required: true, message: 'Please enter answer.'}]}
                    >
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="q2"
                        label="What am I thankful for today?"
                        rules={[{required: true, message: 'Please enter answer.'}]}
                    >
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="q3"
                        label="What did I feel today?"
                        rules={[{required: true, message: 'Please enter answer.'}]}
                    >
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="q4"
                        label="What should I pray for?"
                        rules={[{required: true, message: 'Please enter answer.'}]}
                    >
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="q5"
                        label="How do I feel about tomorrow?"
                        rules={[{required: true, message: 'Please enter answer'}]}
                    >
                        <Input placeholder=""/>
                    </Form.Item>
                </Col>
           </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
}

export default EntryDrawerForm;