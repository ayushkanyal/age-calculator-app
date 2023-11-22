const today = new Date();
const inputs = document.getElementsByTagName("input");
const results = document.getElementsByClassName("result_number");
const calculate_button = document.getElementById("calculate_result");
const input_column = document.getElementsByClassName("input_column");
const error_text = document.getElementsByClassName("error_text");

function calculate() {
  let negativeMonth = 0;
  let negativeDay = 0;
  let day_column = input_column[0];
  let month_column = input_column[1];
  let year_column = input_column[2];
  let input_day = inputs[0];
  let input_month = inputs[1];
  let input_year = inputs[2];
  let newdate = new Date(
    input_year.value,
    input_month.value - 1,
    input_day.value
  );

  console.log(input_day.value);
  if (
    input_day.value === undefined ||
    input_day.value === null ||
    input_day.value === "" ||
    input_day.value < 1 ||
    input_day.value > 31 ||
    (input_day.value > 29 && input_month.value === 2)
  ) {
    console.log("Input day empty");
    day_column.classList.add("error_state");
    input_day.classList.add("red_border");
    if (input_day.value > 31 || (input_day.value > 29 && input_month === 4)) {
      error_text[0].innerHTML = "Must be a valid day";
    }
    error_text[0].classList.remove("hidden");
  } else {
    day_column.classList.remove("error_state");
    input_day.classList.remove("red_border");
    error_text[0].classList.add("hidden");
    let days = today.getDate() - input_day.value;
    if (days < 1) {
      negativeDay++;
      if (input_month === 2) {
        if (
          input_year % 100 === 0 ? input_year % 400 === 0 : input_year % 4 === 0
        ) {
          days += 29;
        } else {
          days += 28;
        }
      } else if (input_month % 2 === 0) {
        days += 30;
      } else {
        days += 31;
      }
    }
    results[2].innerHTML = days;
  }
  if (
    input_month.value === undefined ||
    input_month.value === null ||
    input_month.value === "" ||
    input_month.value > 12
  ) {
    console.log("Input month empty");
    month_column.classList.add("error_state");
    input_month.classList.add("red_border");
    if (input_month.value > 12) {
      error_text[1].innerHTML = "Must be a valid month";
    }
    error_text[1].classList.remove("hidden");
  } else {
    month_column.classList.remove("error_state");
    input_month.classList.remove("red_border");
    error_text[1].classList.add("hidden");
    let months = today.getMonth() + 1 - input_month.value - negativeDay;
    if (months < 0) {
      negativeMonth++;
      months += 12;
    }
    results[1].innerHTML = months;
  }
  if (
    input_year.value === undefined ||
    input_year.value === null ||
    input_year.value === "" ||
    input_year.value > today.getFullYear()
  ) {
    console.log("Input year empty");
    year_column.classList.add("error_state");
    input_year.classList.add("red_border");
    if (input_year.value > 12) {
      error_text[2].innerHTML = "Must be in the past";
    }
    error_text[2].classList.remove("hidden");
  } else {
    year_column.classList.remove("error_state");
    input_year.classList.remove("red_border");
    error_text[2].classList.add("hidden");
    results[0].innerHTML =
      today.getFullYear() - input_year.value - negativeMonth;
  }
  console.log(newdate);
}

calculate_button.addEventListener("click", calculate);
