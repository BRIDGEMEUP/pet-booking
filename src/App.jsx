import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Input,
  DatePicker,
  Form,
  message,
} from "antd";
import { CalendarOutlined, MailOutlined } from "@ant-design/icons";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [selectedKey, setSelectedKey] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const services = [
    { title: "🐕 Pet Grooming", desc: "Bathing, haircut, nail trimming", price: "$30" },
    { title: "🐾 Veterinary Appointments", desc: "Book a vet visit for your pet", price: "$50" },
    { title: "🏠 Pet Boarding", desc: "Overnight stays if the owner is away", price: "$40/night" },
    { title: "🐶 Daycare Services", desc: "Short-term pet care during the day", price: "$25/day" },
    { title: "🍖 Pet Training", desc: "Obedience & behavior training", price: "$60/session" },
    { title: "🚕 Pet Transport", desc: "Pick-up and drop-off to vets or grooming centers", price: "$20/trip" },
  ];

  const handleBooking = (values) => {
    message.success("Booking submitted successfully!");
    console.log("Booking Info:", values);
  };

  // Detect scroll to add transition effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", overflowX: "hidden" }}>
      {/* NAV */}
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 100,
          transition: "all 0.3s ease",
          background: scrolled ? "#F36F27" : "#F57927",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          style={{
            background: "transparent",
            justifyContent: "center",
            fontWeight: 500,
            transition: "all 0.3s ease",
          }}
          items={[
            { label: <a href="#home">Home</a>, key: "home" },
            { label: <a href="#services">Services</a>, key: "services" },
            { label: <a href="#booking">Booking</a>, key: "booking" },
            { label: <a href="#contact">Contact</a>, key: "contact" },
          ]}
        />
      </Header>

      {/* Spacer for fixed navbar */}
      <div style={{ height: 64 }}></div>

      {/* HERO SECTION */}
      <div
        id="home"
        style={{
          position: "relative",
          height: "70vh",
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/006/180/933/original/set-of-cute-cartoonish-dogs-isolated-on-a-white-background-free-vector.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Title style={{ color: "#F57927" }}>🐾 Welcome to Pawfect Care</Title>
          <Paragraph style={{ maxWidth: "600px", margin: "0 auto", color: "#000" }}>
            Your trusted partner in pet care. From grooming and training to daycare and vet appointments, we’ve got your furry friend covered.
          </Paragraph>

          {/* Search Bar */}
          <div
           style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "40px",           // <-- move from bottom of hero
  left: "50%",
  transform: "translateX(-50%)", // center horizontally
  maxWidth: 900,
  width: "90%",
  background: "white",
  borderRadius: 8,
  padding: "10px 15px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  zIndex: 10,
}}

          >
            <Input placeholder="Pet type or service" style={{ flex: 2, marginRight: 10 }} />
            <DatePicker style={{ flex: 1, marginRight: 10 }} />
            <Input placeholder="Number of pets" style={{ flex: 1, marginRight: 10 }} />
            <Button type="primary" style={{ flex: 1, background: "#F57927", border: "none" }}>
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" style={{ padding: "50px 20px", background: "#transparent" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          ✨ Our Services ✨
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {services.map((service, i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  minHeight: 220,
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.6)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.4)";
                }}
              >
                <Title level={4} style={{ color: "#F57927" }}>
                  {service.title}
                </Title>
                <p>{service.desc}</p>
                <p style={{ fontWeight: "bold" }}>{service.price}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* BOOKING */}
      <section id="booking" style={{ padding: "50px 20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          📅 Book an Appointment
        </Title>
        <Form
          layout="vertical"
          onFinish={handleBooking}
          style={{
            background: "#f5f5f5",
            padding: "30px",
            borderRadius: 12,
            maxWidth: 600,
            margin: "auto",
          }}
        >
          <Form.Item
            label="Pet's Name"
            name="petName"
            rules={[{ required: true, message: "Please enter your pet's name" }]}
          >
            <Input placeholder="Enter your pet's name" />
          </Form.Item>

          <Form.Item
            label="Select Date"
            name="date"
            rules={[{ required: true, message: "Please choose a date" }]}
          >
            <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ background: "#F57927", border: "none" }}>
            Confirm Booking
          </Button>
        </Form>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "50px 20px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          📩 Contact Us
        </Title>
        <Form
          layout="vertical"
          style={{ maxWidth: 600, margin: "auto" }}
          onFinish={() => message.success("Message sent successfully!")}
        >
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Your Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your message" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<MailOutlined />}
            style={{ background: "#F57927", border: "none" }}
          >
            Send Message
          </Button>
        </Form>
      </section>

      {/* FOOTER */}
      <Footer style={{ textAlign: "center", background: "#0000", color: "grey" }}>
        © 2025 Pawfect Care. All rights reserved.
      </Footer>
    </Layout>
  );
}

export default App;
