import React from "react"

export default function Contact() {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message!')
    }

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        title: "",
        message: ""
    });

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div>
            <form 
            className="contact-container"
            onSubmit={handleSubmit}
            >
                <h3 className="contact-headline full-width">Contact</h3>
                <div className="form-group">
                    <label className="contact-name"> Name* </label>
                    <input type='text' 
                        name="name" 
                        onChange={handleChange}
                        value={formData.name}
                        pattern="[a-zA-Z ]*"
                        required />
                </div>

                <div className="form-group">
                    <label className="contact-email"> Email* </label>
                    <input type='email' 
                        name="email" 
                        onChange={handleChange}
                        value={formData.email}
                        pattern="([a-zA-Z0-9\\_\\-\\.]+)@([a-zA-Z]+).(.+)"
                        required />                                             
                </div>

                <label className="contact-title full-width"> Title </label>
                <input type='text' 
                    onChange={handleChange}
                    name="title" 
                    value={formData.title}
                    required />

                <label className="contact-textarea full-width">Your Message </label>
                <textarea 
                    onChange={handleChange}
                    name="message" 
                    value={formData.message}
                    required />
                
                <button className="contact-button full-width">Post Comment</button>
            </form> 
        </div>
    )
}