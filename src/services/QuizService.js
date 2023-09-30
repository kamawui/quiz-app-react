class Service {
    #apiBase = "https://opentdb.com/api.php?";
    #baseDifficulty = "";
    #baseAmount = 12;
    #multipleType= "multiple";
    #booleanType = "boolean";
    #baseCategory = 19;
    #encode = "urlLegacy";

    constructor() {
        this.#getResource("https://opentdb.com/api_token.php?command=request")
            .then(res => {
                this.token = res.token
            });
    }

    #getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    #transformData = (data) => {
        return data.map(item => {
            return {
                question: item.question,
                correctAnswer: item.correct_answer,
                answers: item.incorrect_answers.concat(item.correct_answer)
            }
        })
    }

    getMultipleQuiz = async (
        difficulty=this.#baseDifficulty,
        category=this.#baseCategory,
        amount=this.#baseAmount,
        type=this.#multipleType
    ) => {
        const res = await this.#getResource(
            `${this.#apiBase}amount=${amount}&category=${category}&type=${type}&token=${this.token}`
        );

        return this.#transformData(res.results);
    }

    getBooleanQuiz = async (
        difficulty=this.#baseDifficulty,
        category=this.#baseCategory,
        amount=4,
        type=this.#booleanType,
    ) => {
        const res = await this.#getResource(`${this.#apiBase}amount=${amount}&category=${category}&type=${type}`);

        return this.#transformData(res.results);
    }
}

export default Service;







