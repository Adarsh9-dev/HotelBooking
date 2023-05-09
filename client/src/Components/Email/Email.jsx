import "./Email.css"

function Email() {
  return (
    <div className="email">
        <h1 className="emailHead">Save time, save money!</h1>
        <p>Sign up and we'll send the best deals to you</p>
        <div className="emailContainer">
            <input type="text" placeholder="Your Email" className="emailInput" />
            <button className="emailSub">Subscribe</button>
        </div>
    </div>
  )
}

export default Email
