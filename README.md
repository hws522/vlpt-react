# Start React with Velopert

<br>

### **JSX**

---

<br>

1. 태그는 닫혀있어야 한다.

   `<input></input>` , `<input />`

<br>

2. 두개이상의 태그는 하나의 태그로 감싸줘야 한다.

   ```jsx
   <div>
     <Hello />
     <div>Hi</div>
   </div>
   ```

   ```jsx
   <>
     <Hello />
     <div>Hi</div>
   </>
   ```

<br>

3. jsx 내부에서 javascript 의 내용을 보여주고 싶다면 {...} 를 감싸준다.

   ```jsx
   function App() {
     const name = 'react';
     return (
       // return 옆 괄호는 그저 가독성을 위해. 없어도 상관없다.
       <>
         <Hello />
         <div>{name}</div>
       </>
     );
   }

   // 출력 : react
   // {} 없으면 name 그대로 출력
   ```

<br>

4. jsx 에서 style 을 사용할 때는 객체 형태로 넣어줘야 한다.

   그리고 class 이름을 지정할 때는 class 대신 className 으로 지정한다.

   ```jsx
   const style = {
       background : 'gray',
   }
   return (
       <div style={style}>
           <div className='my-style'>
       </div>
   )

   ```

<br>

5. 주석은 이렇게 달아야 한다.

   ```jsx
   return (
     <>
       {/* 주석은 이렇게. */}
       <Hello
       //  이렇게도 가능.
       />
       <div style={style}>{name}</div>
       <div className="gray-box"></div>
     </>
   );
   ```

<br>
<br>

### **PROPS**

---

<br>
