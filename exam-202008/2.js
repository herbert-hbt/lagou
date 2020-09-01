const light = (color) => console.log(color)


const formDelay = (color, time) =>
    new Promise((reslove) =>
        setTimeout(() => {
            light(color);
            reslove();
        }, time)
    )

const show = async () => {
    await Promise.all([formDelay("red", 3000), formDelay("green", 1000), formDelay("yellow", 2000)]);
    show()
}


show();