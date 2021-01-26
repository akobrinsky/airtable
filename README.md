# airtable

### How long spent on the assessment:
I actually spent 1.5 - 2 hours whiteboarding the sorting algorithm, and brainstorming ways to place events in the grid. After that I spent about 3-4 hours implementing / building. I'd say 5.5-7 hours if I'm totally honest.

### What I like about my implentation:
This made me think of our favorite css grid in a completely different way. I am very pleased with how I dynamically build up the grid, and tell grid where to place based on the gridIdx (inrelation to event start to the first event start), duration is used as span columns. I tried very hard to get a high level plan of attack before touching code. I also enjoyed the header logic... for no zoom the headers, they show every day and when zoomed they only show dates every week. 

```javascript
const EventDiv = styled.div`
  grid-column: ${(props) =>
    props.duration > 0
      ? `${props.gridIdx} / span ${props.duration}`
      : `${props.gridIdx}`};
  background: lightblue;
  padding: 0 0.5em;
`;

```

```javascript
const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.endGrid},
    ${(props) => (!props.zoomed ? '150px' : '50px')}
  );
  grid-gap: 0.5em;
  overflow-x: scroll;
`;
```
### What you would change if you were going to do it again.
I didn't think there would be much passing around of props involved, and there wasn't too much. If I were to do again, I would put some state management in place. 
I would add draggable functionality if I had more time. My implementation of inline editing is kind of faked. If I did it over I would use refs to trigger the input fields, and keep track of some kind of isEditing state. As it stands now, the inputs are just styled to make it seem like inline editable fields. I mentioned this in the comments, but in my buildEventState function in Timeline.js, I would decouple the building of inputValues for the input fields and the gridConfig. I just placed it in one function for time's sake, and to take advantage of keeping it O(n) with both of those pieces of state by only going through the array once. I might also add a tooltip / popup for the single day events with long names or for better visibility in the zoomed out mode. 

### How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
I referenced this above, but I spend a lot of time in front of the project to get a high level picture of what I wanted. I drew out on paper how the tracks should be filled and white-boarded the algorithm before coding. 

### How you would test this if you had more time.
For unit testing, I would check for rendered markup based on props. 
Add more event examples with myriad of values: further spread apart dates, longer names, etc.
I would add prop types
Related to that, I would add static type checking with TypeScript, helps immensely to avoid prop errors
