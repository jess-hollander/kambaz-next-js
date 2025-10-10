let true1 = true, false1 = false, false2 = false, true2 = true, true3 = true, true4 = true, true5 = true, false3 = false;

export default function IfElse() {
 return(
    <div id="wd-if-else">
       <h4>If Else</h4>
       { true1 && <p>true1</p> }
       { !false1 ? <p>!false1</p>
                 : <p>false1</p> } <hr/>
    </div>
 );
}
