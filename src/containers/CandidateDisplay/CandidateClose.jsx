import React, {Component} from 'react'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
const CandidateClose = (props) => {

      return (
        <button {...props} style={{
            border: '10px',
            background: 'none',
            boxSizing: 'border-box',
            display: 'inline-block',
            font: 'inherit',
            fontFamily: 'Roboto, sans-serif',
            tapHighlightColor: 'rgba(0, 0, 0, 0)',
            cursor: 'pointer',
            textDecoration: 'none',
            outline: 'none',
            transform: 'translate3d(0, 0, 0)',
            position: 'absolute',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            padding: '12px',
            width: '48px',
            height: '48px',
            fontSize: '0',
            top: '0',
            bottom: '0',
            margin: 'auto',
            right: '4px',
            WebkitAppearance: 'button'
        }}>
            <div>
                <span style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    overflow: 'hidden'
                }}></span>
                <NavigationClose/>
            </div>

        </button>
    );
}

export default CandidateClose;
