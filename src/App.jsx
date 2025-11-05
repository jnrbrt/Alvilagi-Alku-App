import React, { useState } from 'react';
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

function App() {
    const [penz, setPenz] = useState(0);
    const [befolyas, setBefolyas] = useState(0);
    const [csempeszek, setCsempeszek] = useState(0);
    const [loszer, setLoszer] = useState(0);

    const [selectedAreas, setSelectedAreas] = useState([]);

    const updateValue = (setter, amount) => {
        setter(prevValue => Math.max(0, prevValue + amount));
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
                        <button
                            className="btn btn-minus"
                            onClick={() => updateValue(setPenz, -50)}>-</button>
                        <button
                            className="btn btn-plus"
                            onClick={() => updateValue(setPenz, 50)}>+</button>
                    </div>
                </div>

                <div className="stat-item">
                    <h3>Befolyás</h3>
                    <div className="count">{befolyas}</div>
                    <div className="buttons">
                        <button
                            className="btn btn-minus"
                            onClick={() => updateValue(setBefolyas, -1)}>-</button>
                        <button
                            className="btn btn-plus"
                            onClick={() => updateValue(setBefolyas, 1)}>+</button>
                    </div>
                </div>

                <div className="stat-item">
                    <h3>Csempészáru</h3>
                    <div className="count">{csempeszek}</div>
                    <div className="buttons">
                        <button
                            className="btn btn-minus"
                            onClick={() => updateValue(setCsempeszek, -1)}>-</button>
                        <button
                            className="btn btn-plus"
                            onClick={() => updateValue(setCsempeszek, 1)}>+</button>
                    </div>
                </div>

                <div className="stat-item">
                    <h3>Lőszer</h3>
                    <div className="count">{loszer}</div>
                    <div className="buttons">
                        <button
                            className="btn btn-minus"
                            onClick={() => updateValue(setLoszer, -1)}>-</button>
                        <button
                            className="btn btn-plus"
                            onClick={() => updateValue(setLoszer, 1)}>+</button>
                    </div>
                </div>
            </div>

            <button className="next-round-btn" onClick={handleNextRound}>Következő kör</button>

            <h1>Területek</h1>
            <div className="areas-grid">
                {allAreas.map((area) => {
                    const isSelected = selectedAreas.includes(area.name);

                    return (
                        <div key={area.name} className={`area-item ${isSelected ? 'selected' : ''}`} onClick={() => toggleAreaSelection(area.name)}>{area.name}</div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;