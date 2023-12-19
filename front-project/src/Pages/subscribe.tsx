import { useState } from 'react';
import './subscribe.css'; 


function Subscribe() {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleButtonClick = (option: React.SetStateAction<string>) => {
    setSelectedOption(option);
  };

  return (
    <div className="container-with-background">
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-4 col-12 mx-auto">
          <h1 className='mov titreMovies' style={{ textAlign: 'center', marginTop: '2rem' }}>Subscribe</h1>
          <div className="button-container" role="group">
            {/* <button
              className={`transi ${selectedOption === 'option1' ? 'active' : 'inactive'}`}
              onClick={() => handleButtonClick('option1')}
            >
              Annualy
            </button> */}
            <button
              className={`transi ${selectedOption === 'option2' ? 'active' : 'inactive'}`}
              onClick={() => handleButtonClick('option2')}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className='container mx-auto mt-3'>
    <div className="row mt-3">
      {/* <div className="col d-flex justify-content-center">
        {selectedOption === 'option1' &&
             <div className="pricing-area">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6 col-12">
            <div className="single-price">
              <div className="deal-top">
                <h3>Standard</h3>
                <h4> Free <span className="sup"></span> </h4> 
              </div>
              <div className="deal-bottom">
                <ul className="deal-item">
                  <li>Free access to a limited selection of content.</li>
                  <li>Light advertisements.</li>
                  <li>No long-term commitment.</li>
                  <li>Limited catalog compared to other plans.</li>
                  <li>Regular advertisements during viewing.</li>
                </ul>
                <div className="btn-area">
                  <a href="#">Sign Up</a>       
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <div className="single-price">
              <div className="deal-top">
                <h3>Individual</h3>
                <h4> 119.88 <span className="sup">$</span> </h4>
              </div>
              <div className="deal-bottom">
                <ul className="deal-item">
                  <li>Unlimited access to the entire catalog.</li>
                  <li>High-definition streaming.</li>
                  <li>No advertisements during viewing.</li>
                  <li>Upfront annual cost.</li>
                  <li>Limited to a single user.</li>
                </ul>
                <div className="btn-area">
                  <a href="#">Sign Up</a>       
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <div className="single-price">
              <div className="deal-top">
                <h3>Family</h3>
                <h4> 179.88 <span className="sup">$</span> </h4> 
              </div>
              <div className="deal-bottom">
                <ul className="deal-item">
                  <li>Unlimited access to the entire catalog for multiple users.</li>
                  <li>High-definition streaming.</li>
                  <li>No advertisements during viewing.</li>
                  <li>Parental control features.</li>
                  <li>Higher annual cost than the individual plan.</li>
                </ul>
                <div className="btn-area">
                  <a href="#">Sign Up</a>       
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>       
    
    
    </div>} */}
        {selectedOption === 'option2' &&
            <div className="pricing-area">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="single-price">
              <div className="deal-top">
                <h3>Standard</h3>
                <h4> Free <span className="sup"></span> </h4> 
              </div>
              <div className="deal-bottom">
                <ul className="deal-item">
                  <li>Free access to a limited selection of content.</li>
                  <li>Light advertisements.</li>
                  <li>No long-term commitment.</li>
                  <li>Limited catalog compared to other plans.</li>
                  <li>Regular advertisements during viewing.</li>
                </ul>
                <div className="btn-area">
                  <a href="#">Sign Up</a>       
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="single-price">
              <div className="deal-top">
                <h3>Individual</h3>
                <h4> 12.99 <span className="sup">$</span> </h4>
              </div>
              <div className="deal-bottom">
                <ul className="deal-item">
                  <li>Unlimited access to the entire catalog.</li>
                  <li>High-definition streaming.</li>
                  <li>No advertisements during viewing.</li>
                  <li>Monthly payment for more flexibility.</li>
                  <li>Slightly higher monthly cost than the annual plan.</li>
                </ul>
                <div className="btn-area">
                  <a href="#">Sign Up</a>       
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 col-12">
            <div className="single-price">
              <div className="deal-top">
                <h3>Family</h3>
                <h4> 19.99 <span className="sup">$</span> </h4> 
              </div>
              <div className="deal-bottom">
                <ul className="deal-item">
                  <li>Unlimited access to the entire catalog for multiple users.</li>
                  <li>High-definition streaming.</li>
                  <li>No advertisements during viewing.</li>
                  <li>Parental control features.</li>
                  <li>Monthly payment for more flexibility.</li>
                </ul>
                <div className="btn-area">
                  <a href="#">Sign Up</a>       
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>       
    
    
    </div>
}
      </div>
    </div>
</div>
// </div>
  );
}

export default Subscribe;
