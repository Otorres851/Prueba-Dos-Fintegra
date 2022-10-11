import React, { useState, useEffect } from 'react';

const SearchAge = () => {
    const [name, setName] = useState("");
    const [guessedAge, setGuessedAge] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value)

    };

    const requestGuessAge = async (name) => {
        const response = await fetch(`https://api.agify.io?name=${name}`);
        const { age } = await response.json();
        return age;        
    }
    
    useEffect(() => {
        if (!name) return;
        setLoading(true);
        requestGuessAge(name)
            .then(setGuessedAge)
            .finally(() => setLoading(false));
    }, [name]);



    /*Country*/
    const [nam, setNam] = useState("");
    const [guessedCountry, setGuessedCountry] = useState(undefined);
    const [load, setLoad] = useState(false);

    const handleChangeName = (e) => {
        setNam(e.target.value)

    };

    const requestGuessCountry = async (name) => {
        const response = await fetch(`https://api.agify.io?name=${name}&country_id=US`);
        const { country_id } = await response.json();
        return country_id;        
    }

    useEffect(() => {
        if (!nam) return;
        setLoad(true);
        requestGuessCountry(nam)
            .then(setGuessedCountry)
            .finally(() => setLoad(false));
    }, [nam]);
    
    return (
        <div className='container'>
            <form>
                <label className="form-label col-sm-2">Insert Name</label>
                <input
                    type="text" placeholder='Name' required
                    className="form-control form-control-sm col-md-12" value={name}
                    onChange={handleChange} />

                <h2 className="option">Optional</h2>

                <label className="form-label col-sm-2">Insert Name For Localization</label>
                <input
                    type="text" placeholder='Name For Localization'
                    className="form-control form-control-sm col-md-12" value={nam} 
                    onChange={handleChangeName}/>
                <div>
                    <p className="AgeText">
                        <AgeText
                            name={name}
                            age={guessedAge}
                            loading={loading}
                        />
                    </p>
                </div>

                <div>
                    <p className="CountryText">
                        <CountryText
                            name={nam}
                            country_id={guessedCountry}
                            load={load}
                        />
                    </p>
                </div>

            </form>
        </div>
    )

    /*AgeText & CountryText*/ 

    function AgeText({ name, age, loading }) {
        if (!name) return "";
        if (loading) return `Hello ${name}! Your age is ...`;
        if (typeof age === 'number') {
            return `Hello ${name}! Your age is ${age}`;
        } else {
            return `Sorry ${name}! I could not guess your age!`;
        }
    }

    function CountryText({ name, country_id, load }) {
        if (!name) return "";
        if (load) return `Hello ${name}! Your country is ...`;
        if (typeof country_id === 'string') {
            return `Hello ${name}! Your country is ${country_id}`;
        } else {
            return `Sorry ${name}! I could not guess your country!`;
        }
    }
   
}

export default SearchAge;