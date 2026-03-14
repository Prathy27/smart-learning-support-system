
import abt from './assets/abt.png'
function About() {
  return (
     <div className='hero'>

    
    <style>
{`
  .abt {
    text-align: center;
    padding: 40px;
  }
 .abt img{
 height:300px;
 border-radius:30px 0px}
  .about-section {
    padding: 40px 60px;
  }

  .about-section h2 {
  position:relative;
    margin-top: 0px;
    color: #0b0938;
  }

  ul {
    margin-left: 20px;
  }

  .closing {
    margin-top: 30px;
    font-weight: 600;
    color: #333;
  }
`}
</style>
 
      <div className="abt">
         <h1>About Smart Learning</h1><br></br>
        <img src={abt} alt="" />
       
        <h3>Making learning fun, simple, and interactive for every child.</h3>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide easy, engaging and child-friendly learning 
          for students from classes 3 to 8. We aim to make education enjoyable, 
          accessible and interactive.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Simple and fun learning materials</li>
          <li>Interactive quizzes and activities</li>
          <li>Child-friendly explanations</li>
          <li>Visually rich study content</li>
        </ul>

        <h2>Who Is It For?</h2>
        <p>
          Smart Learning is designed for children aged 6–14, helping them 
          understand concepts in a friendly and playful way.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Easy-to-understand lessons</li>
          <li>Fun and colorful content for kids</li>
          <li>Better retention through interactive learning</li>
        </ul>

        <p className="closing">
          At Smart Learning, we believe every child learns best when learning is fun!
        </p>
      </div>
      </div>
  );
}

export default About;
