import React, { useState, useEffect } from 'react';
import './App.css';

const allAreas = [
    //penzes teruletek
    { name: 'Lakótelep', resources: { penz: 100, befolyas: 0, csempeszek: 0, loszer: 0 } },
    { name: 'Kikötőnegyed', resources: { penz: 100, befolyas: 0, csempeszek: 0, loszer: 0 } },
    { name: 'Luxus lakópark', resources: { penz: 100, befolyas: 0, csempeszek: 0, loszer: 0 } },
    { name: 'Tanyanegyed', resources: { penz: 100, befolyas: 0, csempeszek: 0, loszer: 0 } },

    //nem penzes teruletek
    { name: 'Gyárnegyed', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
    { name: 'Piac', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
    { name: 'Főtér', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
    { name: 'Vasútállomás', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
    { name: 'Kocsmanegyed', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
    { name: 'Turistanegyed', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
    { name: 'Állatkert', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
    { name: 'Kiserdő', resources: { penz: 0, befolyas: 1, csempeszek: 1, loszer: 1 } },
];

const loadFromSession = (key, defaultValue) => {
    const saved = sessionStorage.getItem(key);
    return saved !== null ? parseInt(saved, 10) : defaultValue;
};

function App() {
    const [penz, setPenz] = useState(() => loadFromSession('app_penz', 0));
    const [befolyas, setBefolyas] = useState(() => loadFromSession('app_befolyas', 0));
    const [csempeszek, setCsempeszek] = useState(() => loadFromSession('app_csempeszek', 0));
    const [loszer, setLoszer] = useState(() => loadFromSession('app_loszer', 0));

    const [selectedAreas, setSelectedAreas] = useState([]);

    useEffect(() => {
        sessionStorage.setItem('app_penz', penz);
        sessionStorage.setItem('app_befolyas', befolyas);
        sessionStorage.setItem('app_csempeszek', csempeszek);
        sessionStorage.setItem('app_loszer', loszer);
    }, [penz, befolyas, csempeszek, loszer]);

    const updateValue = (setter, amount) => {
        setter(prevValue => (prevValue + amount));
    };

    const toggleAreaSelection = (areaName) => {
        setSelectedAreas(prevSelected => {
            if (prevSelected.includes(areaName)) {
                return prevSelected.filter(name => name !== areaName);
            } else {
                return [...prevSelected, areaName];
            }
        });
    };

    const handleNextRound = () => {
        let totalPenz = 0;
        let totalBefolyas = 0;
        let totalCsempeszek = 0;
        let totalLoszer = 0;

        selectedAreas.forEach(selectedName => {
            const areaData = allAreas.find(area => area.name === selectedName);

            if (areaData) {
                totalPenz += areaData.resources.penz;
                totalBefolyas += areaData.resources.befolyas;
                totalCsempeszek += areaData.resources.csempeszek;
                totalLoszer += areaData.resources.loszer;
            }
        });

        updateValue(setPenz, totalPenz);
        updateValue(setBefolyas, totalBefolyas);
        updateValue(setCsempeszek, totalCsempeszek);
        updateValue(setLoszer, totalLoszer);
    };


    return (
        <div className="app-container">
            <div className="title">
                <h1>Alvilági Alku</h1>
            </div>

            <h1>Készletek</h1>
            <div className="stats-grid">

                <div className="stat-item">
                    <h3>Pénz</h3>
                    <div className="count">{penz}</div>
                    <div className="buttons">
                        <button className="btn btn-minus" onClick={() => updateValue(setPenz, -50)}>-</button>
                        <button className="btn btn-plus" onClick={() => updateValue(setPenz, 50)}>+</button>
                    </div>
                    <div className="sub-buttons">
                        <button className="sub-btn btn-minus" onClick={() => updateValue(setPenz, -100)}>-100</button>
                        <button className="sub-btn btn-plus" onClick={() => updateValue(setPenz, 100)}>+100</button>
                    </div>
                </div>

                <div className="stat-item">
                    <h3>Befolyás</h3>
                    <div className="count">{befolyas}</div>
                    <div className="buttons">
                        <button className="btn btn-minus" onClick={() => updateValue(setBefolyas, -1)}>-</button>
                        <button className="btn btn-plus" onClick={() => updateValue(setBefolyas, 1)}>+</button>
                    </div>
                    <div className="sub-buttons">
                        <button className="sub-btn btn-minus" onClick={() => updateValue(setBefolyas, -5)}>-5</button>
                        <button className="sub-btn btn-plus" onClick={() => updateValue(setBefolyas, 5)}>+5</button>
                    </div>
                </div>

                <div className="stat-item">
                    <h3>Csempészáru</h3>
                    <div className="count">{csempeszek}</div>
                    <div className="buttons">
                        <button className="btn btn-minus" onClick={() => updateValue(setCsempeszek, -1)}>-</button>
                        <button className="btn btn-plus" onClick={() => updateValue(setCsempeszek, 1)}>+</button>
                    </div>
                    <div className="sub-buttons">
                        <button className="sub-btn btn-minus" onClick={() => updateValue(setCsempeszek, -5)}>-5</button>
                        <button className="sub-btn btn-plus" onClick={() => updateValue(setCsempeszek, 5)}>+5</button>
                    </div>
                </div>

                <div className="stat-item">
                    <h3>Lőszer</h3>
                    <div className="count">{loszer}</div>
                    <div className="buttons">
                        <button className="btn btn-minus" onClick={() => updateValue(setLoszer, -1)}>-</button>
                        <button className="btn btn-plus" onClick={() => updateValue(setLoszer, 1)}>+</button>
                    </div>
                    <div className="sub-buttons">
                        <button className="sub-btn btn-minus" onClick={() => updateValue(setLoszer, -5)}>-5</button>
                        <button className="sub-btn btn-plus" onClick={() => updateValue(setLoszer, 5)}>+5</button>
                    </div>
                </div>
            </div>

            <button className="next-round-btn" onClick={handleNextRound}>Következő kör</button>

            <h1>Területek</h1>
            <div className="areas-grid">
                {allAreas.map((area) => {
                    const isSelected = selectedAreas.includes(area.name);
                    const isMoneyArea = area.resources.penz > 0;
                    const { penz, befolyas, csempeszek, loszer } = area.resources;

                    return (
                        <div
                            key={area.name}
                            className={`area-item ${isSelected ? 'selected' : ''} ${isMoneyArea ? 'money-area' : ''}`}
                            onClick={() => toggleAreaSelection(area.name)}
                        >
                            <div className="area-name">{area.name}</div>
                            <div className="area-resources">
                                {`P: ${penz} | B: ${befolyas} | CS: ${csempeszek} | L: ${loszer}`}
                                {}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;