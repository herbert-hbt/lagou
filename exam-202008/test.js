// const f = async() => {
//     console.log(1)
//     new Promise((resolve, reject) => {
//         console.log(2)
//         throw new Error()
//         reject()
//             // setTimeout(() => reject())
//     }).catch(() => {
//         console.log(3)
//         console.log("出错了")
//     })
//     console.log(4);
// }

const f = () => {
    try {
        const p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject()
                        // throw new Error("error")
                })

                // reject()
                // setTimeout(() => reject())
            })
            // .catch(() => {
            //     console.log("dddd")
            // })
            // throw new Error("error")
    } catch (err) {
        console.log("失败了");
    }
}

f()