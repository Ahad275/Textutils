import React from 'react';
import Navbar from './Navbar';
import FormText from './Formtext';
import Footer from './footer';
import './App.css';


function App() {
    return (
        <div className="App">
            <Navbar title="TextUtil" />
            <FormText />
            {/* Add Footer component */}
            <Footer />
        </div>
    );
}

export default App;
