/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import * as R from 'ramda';


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    return R.allPass([
        R.propEq('star', 'red'),
        R.propEq('square', 'green'),
        R.propEq('triangle', 'white'),
        R.propEq('circle', 'white')
    ])({star, square, triangle, circle});
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) => {
    const shapes = [star, square, triangle, circle];
    return R.gte(R.filter(R.equals('green'), shapes).length, 2);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
    const shapes = [star, square, triangle, circle];
    const redCount = R.filter(R.equals('red'), shapes).length;
    const blueCount = R.filter(R.equals('blue'), shapes).length;
    return redCount === blueCount;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ star, square, triangle, circle }) => {
    return R.allPass([
        R.propEq('circle', 'blue'),
        R.propEq('star', 'red'),
        R.propEq('square', 'orange')
    ])({ star, square, triangle, circle });
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
    const shapes = [star, square, triangle, circle];
    const colors = R.uniq(R.filter(R.complement(R.equals('white')), shapes));
    const counts = R.map(color => R.filter(R.equals(color), shapes).length, colors);
    return R.any(R.gte(R.__, 3), counts);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
    const shapes = { star, square, triangle, circle };
    const greenCount = R.filter(R.equals('green'), R.values(shapes)).length;
    const redCount = R.filter(R.equals('red'), R.values(shapes)).length;

    return greenCount === 2 && redCount === 1 && triangle === 'green';
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) => {
    const shapes = [star, square, triangle, circle];
    return R.all(R.equals('orange'), shapes);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star, square, triangle, circle }) => {
    return R.allPass([
        R.complement(R.propEq('star', 'red')),
        R.complement(R.propEq('star', 'white'))
    ])({ star });
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) => {
    const shapes = [star, square, triangle, circle];
    return R.all(R.equals('green'), shapes);
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ star, square, triangle, circle }) => {
    return R.allPass([
        R.complement(R.propEq('triangle', 'white')),
        R.propEq('triangle', square)
    ])({ star, square, triangle, circle });
};
