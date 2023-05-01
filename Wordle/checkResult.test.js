const checkResult = require('./checkResult.js');

test('checkResult', () => {
    expect(checkResult('ababb', 'cacaa')).toEqual({ "correct": [], "semicorrect": [1, 3], "incorrect": [0, 2, 4] });
    expect(checkResult('mango', 'mango')).toEqual({ "correct": [0, 1, 2, 3, 4], "semicorrect": [], "incorrect": [] });
    expect(checkResult('train', 'rains')).toEqual({ "correct": [], "semicorrect": [0, 1, 2, 3], "incorrect": [4] });
    expect(checkResult('coxes', 'boxes')).toEqual({ "correct": [1, 2, 3, 4], "semicorrect": [], "incorrect": [0] });
    expect(checkResult('goods', 'orion')).toEqual({ "correct": [], "semicorrect": [0, 3], "incorrect": [1, 2, 4] });
    expect(checkResult('apple', 'pipes')).toEqual({ "correct": [2], "semicorrect": [0, 3], "incorrect": [1, 4] });
    expect(checkResult('greed', 'money')).toEqual({ "correct": [3], "semicorrect": [], "incorrect": [0, 1, 2, 4] });
    expect(checkResult('woman', 'women')).toEqual({ "correct": [0, 1, 2, 4], "semicorrect": [], "incorrect": [3] });
    expect(checkResult('chase', 'sushi')).toEqual({ "correct": [], "semicorrect": [0, 3], "incorrect": [1, 2, 4] });
    expect(checkResult('foots', 'shoot')).toEqual({ "correct": [2], "semicorrect": [0, 3, 4], "incorrect": [1] });
});