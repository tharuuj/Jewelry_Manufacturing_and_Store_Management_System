//import React from 'react'
import emailjs from 'emailjs-com'

const EmpMailer = () => {
    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_ebqhdsi",
            "template_tko2jnk",
            e.target,
            "APBGRowBI3vk9i37K"
        ).then(res => {
            console.log(res);
        }).catch(err=> console.log(err));
        alert('Email sent successfully')
    }
    return (
        <div className="container border"
            style={{
                marginTop: "50px",
                width: '50%',
                backgroundImage: 'url(/emailbackground.jpeg)',
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}>
            <h1 style={{ marginTop: '25px' }}>Contact Form</h1>
            <form className="row" style={{ margin: "25px 85px 75px 100px" }} onSubmit={sendEmail}>
                <label>Name</label>
                <input type='text' name='empname' className="form-control" />

                <label>Email</label>
                <input type='email' name='emp_email' className="form-control" />

                <label>Message</label>
                <textarea name='message' rows='4' className="form-control" />

                <input type='submit' value="Send" className='form-control btn btn-primary' style={{ marginTop: "30px" }} />

            </form>
        </div>
    )
}

export default EmpMailer