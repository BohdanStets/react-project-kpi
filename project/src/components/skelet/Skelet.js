import './Skelet.scss';

const Skelet = () => {
    return (
        <div className="skelet-wrapper">
            <p className="char__select">Please select a character to see information</p>
            <div className="skelet">
                <div className="pulse skelet__header">
                    <div className="pulse skelet__circle"></div>
                    <div className="pulse skelet__mini"></div>
                </div>
                <div className="pulse skelet__block"></div>
                <div className="pulse skelet__block"></div>
                <div className="pulse skelet__block"></div>
            </div>
        </div>
    )
}

export default Skelet;