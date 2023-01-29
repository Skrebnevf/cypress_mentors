import React, {useEffect, useRef, useState} from 'react';

import '../../../scss/components/Elements/_counter.scss';

import "../../../scss/components/Elements/_counter.scss";

const cn = require('classnames');
const defaultClass = 'counter';

interface ICounterProps {
    count: number;
    max?: number;
    pointerMax?: number;
    min?: number;
    className?: string;
    onChange: Function,
    disabled?: boolean
    forceUpdate?: boolean
    debounce?: number
}

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;

const Counter = (props: ICounterProps) => {
    const firstRender = useRef(true);

    const [count, setClicks] = useState(props.count || props.min || 0 || '');
    const [changeTimeout, setChangeTimeout] = useState<any>(null);
    const [noDebounce, setNoDebounce] = useState(false);
    const className = cn(defaultClass, props.className);
    const {onChange} = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (count !== props.count && props.forceUpdate) {
            setClicks(props.count);
            setNoDebounce(true);
        }
    })
    const onChangeHandler = (value: number, fromPointer: boolean) => {
        const checkMin = (props.min && (value < props.min));
        const checkMax = (props.max && (value > props.max));

        let newValue: any = value;

        newValue = checkMin ? props.min : newValue;
        newValue = checkMax ? props.max : newValue;
        setClicks(newValue);
        setNoDebounce(fromPointer);
    };
    const onKeyDownHandler = (e: any) => {
        const keyCode = e.keyCode;
        if (count === 0 && ((keyCode === KEY_DELETE) || (keyCode === KEY_BACKSPACE))) {
            setClicks('');
        }
    };
    const onBlurHandler = () => {
        if (!count && props.min) {
            setClicks(props.min);
        }

        if (props.debounce) {
            if (changeTimeout) {
                clearTimeout(changeTimeout);
                setChangeTimeout(null);
                onChange(count);
            }
        }
    };
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (props.forceUpdate) {
            return;
        }
        if (!noDebounce && props.debounce) {
            if (changeTimeout) {
                clearTimeout(changeTimeout);
            }
            setChangeTimeout(setTimeout(() => {
                onChange(count);
                setChangeTimeout(null);
            }, props.debounce));
        } else {
            onChange(count);
        }
        setNoDebounce(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    let showAdd = true;
    if (props.pointerMax && props.pointerMax <= count) {
        showAdd = false;
    }

    return (
        <div className={className}>
            <button disabled={props.disabled} onClick={() => onChangeHandler(Number(props.count - 1), true)}
                    className="counter-button minus" data-cy='product_count_minus'>
                <span className="counter-span">{null}</span>
            </button>
            <input disabled={props.disabled} value={count + '' || ''} className="counter-input" type="number"
                   onChange={(e: any) => {
                       onChangeHandler(Number(e.target.value), false)
                   }}
                   onKeyDown={(e: any) => onKeyDownHandler(e)}
                   onBlur={() => onBlurHandler()}
            />
            {showAdd && <button disabled={props.disabled} onClick={() => onChangeHandler(Number(props.count + 1), true)}
                    className="counter-button plus" data-cy='product_count_plus'>
                <span className="counter-span">{null}</span>
            </button>}
        </div>
    );
};

Counter.defaultProps = {
    className: ""
};

export default Counter;

