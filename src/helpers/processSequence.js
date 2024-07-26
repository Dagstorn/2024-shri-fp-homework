/**
 * @file Домашка по FP ч. 2
 */
import Api from "../tools/api";
import * as R from 'ramda';

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const log = R.tap(writeLog);
    console.log("value", value)

    const validateLength = R.both(
        R.compose(R.lt(R.__, 10), R.length),
        R.compose(R.gt(R.__, 2), R.length)
    );

    const isPositiveNumber = R.both(
        R.compose(R.gt(R.__, 0), parseFloat),
        R.compose(R.not, R.equals(NaN), parseFloat)
    );

    const validateFormat = R.test(/^[0-9.]+$/);

    const validate = R.ifElse(
        R.allPass([validateLength, isPositiveNumber, validateFormat]),
        R.identity,
        () => handleError("Validation Error")
    );


    const toNumberAndRound = R.compose(
        R.tap(log),
        Math.round,
        parseFloat
    );
    const toBinary = number =>
        api.get('https://api.tech/numbers/base', { from: 10, to: 2, number })
            .then(R.prop('result'))
    
    const getAnimal = id => 
        api.get(`https://animals.tech/${id}`, {})
        .   then(R.prop('result'))
            
    const process = R.pipe(
        log,
        validate,
        toNumberAndRound,
        toBinary,
        R.andThen(R.pipe(
            R.length,
            log,
            R.pipe(
                R.curry(Math.pow)(R.__, 2),
                log,
                R.modulo(R.__, 3),
                log,
            ),
        )),
        R.andThen(
            getAnimal,
        ),
        R.andThen(handleSuccess)
    );
    
    Promise.resolve(process(value)).catch(handleError);
};

export default processSequence;
