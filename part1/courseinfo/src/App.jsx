const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.content.part} {props.content.excercises}</p>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part content={props.content[0]} />
            <Part content={props.content[1]} />
            <Part content={props.content[2]} />
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
    const header = 'Half stack application development'

    const content = [
        { part : 'Fundamentals of React', excercises : 10 },
        { part : 'Using props to pass data', excercises : 7 },
        { part : 'State of a component', excercises : 14 },
    ]

    return (
        <div>
            <Header course={header} />
            <Content content={content} />
            <Total content={content} />
        </div>
    )
}

export default App

