const form = document.querySelector("form");
const output = document.querySelector(".output");
const spans = document.querySelectorAll("span");
const dOut = document.querySelector(".d");
const solutions = document.querySelector(".solutions");
const x1Out = document.querySelector(".x1");
const x2Out = document.querySelector(".x2");
const vertex = document.querySelector(".vertex");
const chart = document.querySelector("#chart");

let x1 = 0;
let x2 = 0;
let absDiscriminant = 0;
let imaginary = 0;
let real = 0;

const calcDiscriminant = (a, b, c) => b ** 2 - 4 * a * c;

const dGreaterThanZero = (x1, x2) => {
  solutions.innerText = "Two real solutions";
  x1Out.innerHTML = `x<sub>1</sub> = ${x1}`;
  x2Out.innerHTML = `x<sub>2</sub> = ${x2}`;
};

const dEqualToZero = (x1) => {
  solutions.innerText = "One real solution";
  x1Out.innerHTML = `x = ${x1}`;
  x2Out.innerHTML = ``;
};

const dLessThanZero = (real, imaginary) => {
  solutions.innerText = "Two complex solutions";
  x1Out.innerHTML = `x<sub>1</sub> = ${real} + ${imaginary}i`;
  x2Out.innerHTML = `x<sub>2</sub> = ${real} - ${imaginary}i`;
};

const calcVertices = (a, b, c) => {
  xVertex = -b / (2 * a);
  yVertex = a * xVertex ** 2 + b * xVertex + c;

  xVertex = Math.round(xVertex * 100) / 100;
  yVertex = Math.round(yVertex * 100) / 100;

  vertex.innerText = `Vertex = (${xVertex}, ${yVertex})`;

  return [xVertex, yVertex];
};

const roots = (a, b, c) => {
  discriminant = calcDiscriminant(a, b, c);
  dOut.innerText = discriminant;

  if (discriminant > 0) {
    x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }

    x1 = Math.round(x1 * 100) / 100;
    x2 = Math.round(x2 * 100) / 100;

    dGreaterThanZero(x1, x2);
    plotParabola(a, b, c, x1, x2, null, null);
  } else if (discriminant === 0) {
    x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    x1 = Math.round(x1 * 100) / 100;

    dEqualToZero(x1);
    plotParabola(a, b, c, x1, null, null, null);
  } else {
    absDiscriminant = Math.abs(discriminant);
    imaginary = Math.sqrt(absDiscriminant) / (2 * a);
    real = -b / (2 * a);

    real = Math.round(real * 100) / 100;
    imaginary = Math.round(imaginary * 100) / 100;

    dLessThanZero(real, imaginary);
    plotParabola(a, b, c, null, null, real, imaginary);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const a = Number(form.a.value);
  const b = Number(form.b.value);
  const c = Number(form.c.value);

  spans[0].innerText = a;
  spans[1].innerText = b;
  spans[2].innerText = c;

  roots(a, b, c);

  output.style.display = "block";
});

// chart
let plotParabola = (a, b, c, x1, x2, real, imaginary) => {
  console.log(a, b, c, x1, x2, real, imaginary);
  vertices = calcVertices(a, b, c);
  let data = [];
  let labels = [];

  if (x1 !== null && x2 !== null) {
    console.log("x1 !== null && x2 !== null");
    x1Extend = x1 - Math.abs((x2 - x1) / 2);
    x2Extend = x2 + Math.abs((x2 - x1) / 2);
    x1Extend = Math.round(x1Extend * 100) / 100;
    x2Extend = Math.round(x2Extend * 100) / 100;
    data = [
      {
        x: x1Extend,
        y: a * x1Extend ** 2 + b * x1Extend + c,
      },
      {
        x: x1,
        y: 0,
      },
      {
        x: vertices[0],
        y: vertices[1],
      },
      {
        x: x2,
        y: 0,
      },
      {
        x: x2Extend,
        y: a * x2Extend ** 2 + b * x2Extend + c,
      },
    ];
    labels = [x1Extend, x1, vertices[0], x2, x2Extend];
  } else if (x1 !== null && x2 == null) {
    console.log("x1 !== null && x2 == null");
    x1Extend = x1 - Math.abs(x1);
    x2Extend = x1 + Math.abs(x1);
    x1Extend = Math.round(x1Extend * 100) / 100;
    x2Extend = Math.round(x2Extend * 100) / 100;
    data = [
      {
        x: x1Extend,
        y: a * x1Extend ** 2 + b * x1Extend + c,
      },
      {
        x: vertices[0],
        y: vertices[1],
      },
      {
        x: x2Extend,
        y: a * x2Extend ** 2 + b * x2Extend + c,
      },
    ];
    labels = [x1Extend, vertices[0], x2Extend];
  } else if (real !== null && imaginary !== null) {
    console.log("real !== null && imaginary !== null");
    x1Extend = real - Math.abs(real);
    x2Extend = real + Math.abs(real);
    x1Extend = Math.round(x1Extend * 100) / 100;
    x2Extend = Math.round(x2Extend * 100) / 100;
    data = [
      {
        x: x1Extend,
        y: a * x1Extend ** 2 + b * x1Extend + c,
      },
      {
        x: vertices[0],
        y: vertices[1],
      },
      {
        x: x2Extend,
        y: a * x2Extend ** 2 + b * x2Extend + c,
      },
    ];
    labels = [x1Extend, vertices[0], x2Extend];
  }

  return new Chart(chart, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${a}x^2 + ${b}x + ${c} = 0`,
          data: data,
          borderColor: "rgba(0, 150, 136, 1)",
          fill: false,
          pointBackgroundColor: "rgba(0, 0, 0, 1)",
          pointRadius: 4,
        },
      ],
    },
    options: {
      aspectRatio: 1,
    },
  });
};
