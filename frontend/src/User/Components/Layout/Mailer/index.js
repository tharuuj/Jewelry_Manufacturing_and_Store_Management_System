import emailjs  from 'emailjs-com'
import "./style.css";
const Mailer=()=>{
function sendEmail(e){
    e.preventDefault();

    emailjs.sendForm(
        'service_b14aoai',
        'template_4atuoch',
        e.target,
        'k8mOhvXJ5gwQayP_6'
    ).then(res=>{
        console.log(res);
    }).catch(err=>console.log(err));
    alert('Message sent successfully')
}
    return(
    <div className="emailcontainer">
         <a href="/" class="close"/>
        <h1>Contact Form</h1>
        <form className="contactForm" onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" className="name" name="name" required/>
            <label>Email</label>
            <input type="email" className="user_email" name="user_email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
            <label>Message</label>
            <textarea className="message" name="message" rows="4" required/><br/><br/>
            <input type="submit" value="send"/>
        </form>
    </div>
    );
};

export default Mailer;