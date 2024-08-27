const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = (props) => {
    const { name, exercises, _ } = props.parts

    return (
        <>
            <p>{name} {exercises}</p>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        parts.map(part => 
            <Part key={part.id} parts={part} />
        )
    )
}

const Course = ({ course }) => {
    const { id, name, parts } = course

    return (
        <>
            <Header name={name} />
            <Content parts={parts} />
            <Total sum={parts.reduce(
                (acc, obj) => acc + obj.exercises, 0
            )} />
        </>
    )
}

export default Course
