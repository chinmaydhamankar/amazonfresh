/**
 * Created by Chinmay on 16-04-2016.
 */

var strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
}
var password = document.getElementById('password');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');

password.addEventListener('input', function() {
    var val = password.value;
    alert(val);
    var result = zxcvbn(val);

    meter.value = result.score;

    if (val !== "") {
        text.innerHTML = "Strength: " + strength[result.score];
    } else {
        text.innerHTML = "";
    }
});