const Header = (props) => {
    return (
        <>
            <h1>{props.content.header}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.content.name} {props.content.excercises}</p>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part content={props.content.parts[0]} />
            <Part content={props.content.parts[1]} />
            <Part content={props.content.parts[2]} />
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of excercises {props.content[0].excercises + props.content[1].excercises + props.content[2].excercises}</p>
        </>
    )
}

const App = () => {
    const course = {
        header : 'Half stack application development',
        parts : [
            { name : 'Fundamentals of React', excercises : 10 },
            { name : 'Using props to pass data', excercises : 7 },
            { name : 'State of a component', excercises : 14 },
        ]
    }

    return (
        <div>
            <Header content={course} />
            <Content content={course} />
            <Total content={course.parts} />
        </div>
    )
}

export default App

