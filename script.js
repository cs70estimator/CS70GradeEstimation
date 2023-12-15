
function NormalDist(mean, sigma) {
    this.mean = mean;
    this.sigma = sigma;
    this.pdf = function(x) {
        return Math.exp(-Math.pow(x - this.mean, 2) / (2 * Math.pow(this.sigma, 2))) / (this.sigma * Math.sqrt(2 * Math.PI));
    };
    this.cdf = function(x) {
        return (1 + math.erf((x - this.mean) / (this.sigma * Math.sqrt(2)))) / 2;
    };
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('result').style.display = 'none';
});

function calculateGrade() {
    var mtStd = parseFloat(document.getElementById('mtStd').value);
    var finalStd = parseFloat(document.getElementById('finalStd').value);

    var mtPercent = 0.3125;
    var finalPercent = 0.5625;
    var std = Math.sqrt(mtPercent**2 + finalPercent**2 + 2 * 0.8 * mtPercent * finalPercent);

    var predictor = new NormalDist(0, std);
    var clobber = (mtStd + finalStd) / 2;

    mtStd = Math.max(mtStd, clobber);
    finalStd = Math.max(finalStd, clobber);

    var percentile = predictor.cdf(mtStd * mtPercent + finalStd * finalPercent);
    var grade = getGrade(percentile);

    document.getElementById('result').innerHTML = 'Estimated percentile: ' + (percentile * 100).toFixed(2) + '<br>Translates to an estimated grade of: ' + grade;
    document.getElementById('result').style.display = 'block';
}

function getGrade(percentile) {
    var table = {
        'A+': [0.96, 1],
        'A': [0.816, 0.96],
        'A-': [0.6938, 0.816],
        'B+': [0.4531, 0.6938],
        'B': [0.2173, 0.4531],
        'B-': [0.1354, 0.2173],
        'C+': [0.086, 0.1354],
        'C': [0.0437, 0.086],
        'C-': [0.0229, 0.0437],
        'F': [0, 0.0229]
    };

    for (var grade in table) {
        var upper = table[grade][1];
        var lower = table[grade][0];
        if (percentile <= upper && percentile >= lower) {
            return grade;
        }
    }

    return 'Error';
}
