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
                    className="form-control form-control-sm col-md-12" />
                <div>
                    <p className="AgeText">
                        <AgeText
                            name={name}
                            age={guessedAge}
                            loading={loading}
                        />
                    </p>
                </div>

            </form>
        </div>
    )

    function AgeText({ name, age, loading }) {
        if (!name) return "";
        if (loading) return `Hello ${name}! Your age is ...`;
        if (typeof age === "number") {
            return `Hello ${name}! Your age is ${age}`;
        } else {
            return `Sorry ${name}! I could not guess your age!`;
        }
    }


}

export default SearchAge;