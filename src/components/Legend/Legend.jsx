import React, {PropTypes} from 'react'
import './Legend.css';

const Legend = (props) => {
    const labels = props.labels;
    const colors = props.colors;
    const styles = props.styles;
    return (
        <div className="Legend" style={styles}>
            {labels.map(function(label, labelIndex) {
                return (
                    <div key={labelIndex}>
                        <span className="Legend--color" style={{
                            backgroundColor: colors[labelIndex % colors.length]
                        }}/>
                        <span className="Legend--label">{label}</span>
                    </div>
                );
            })}
        </div>
    )
}

export default Legend
