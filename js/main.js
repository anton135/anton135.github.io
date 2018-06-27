

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUJP9RU0Zrh52-vk8gANsqA0lG7oAr5yU",
    authDomain: "test-fb-be31e.firebaseapp.com",
    databaseURL: "https://test-fb-be31e.firebaseio.com",
    projectId: "test-fb-be31e",
    storageBucket: "test-fb-be31e.appspot.com",
    messagingSenderId: "363256205370"
  };
  firebase.initializeApp(config);

Vue.component ("app-car",{
data: function (){
   return {cars: [
        {model:"BMW", speed:250},
        {model:"Mercedes", speed:270},
        {model:"Audi", speed:260},
        {model:"Ford", speed:230}
    ]}
},
template:'<article><article class="car" v-for="car in cars"><p>{{car.model}}</p></article></article>'
});

Vue.filter ("capitalize", function(value){
if (!value) return "";
value=value.toString();
return value.replace(/\b\w/g,function(l){return l.toUpperCase()});
});

new Vue ({
    el: '#app',
    data: {
        message: "Hello world, hello",
        styleCSS: '',
        value: 1,
        show: true,
        cars: [
            {model:"BMW", speed:250},
            {model:"Mercedes", speed:270},
            {model:"Audi", speed:260},
            {model:"Ford", speed:230}
        ],
        user:{
            email:"",
            password:"",
            passwordConfirm:""
        },
        groupsOriginal:[
            {day:"Pn",name:"Подготовительная группа(стандарт)",timeStart:"16:30",timeEnd:"18:00"},
            {day:"Pn",name:"Основная группа(стандарт)",timeStart:"18:00",timeEnd:"20:00"},
            {day:"Pn",name:"Хобби-группа(латина)",timeStart:"20:00",timeEnd:"21:30"},
            {day:"Vt",name:"Младшая группа",timeStart:"16:00",timeEnd:"17:00"},
            {day:"Vt",name:"Современные танцы",timeStart:"17:00",timeEnd:"18:00"},
            {day:"Vt",name:"Беби группа",timeStart:"18:00",timeEnd:"19:00"},
            {day:"Sr",name:"Младшая группа",timeStart:"15:00",timeEnd:"16:00"},
            {day:"Sr",name:"Подготовительная группа(латина)",timeStart:"16:30",timeEnd:"18:00"},
            {day:"Sr",name:"Основная группа(латина)",timeStart:"18:00",timeEnd:"20:00"},
            {day:"Sr",name:"Хобби-группа(стандарт)",timeStart:"20:00",timeEnd:"21:30"}
        ],
        /*times:["15:00", "16:00","17:00","18:00","19:00","20:00","21:00"],*/
        days:["Pn","Vt","Sr","Cht","Pt","Sb"],
        newGroup:{day:"",name:"",timeStart:"",timeEnd:""}
    },
    methods:{
        changeText (){
            this.message = "Текст";
        },
        increment(value)
        {
            this.value=value;
            this.doubleValue=this.value*2;
            if (this.value==3)
            {
                alert("sdsdsd");
            }
        },
        registerUser()
        {
            firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password);
            alert("registered "+ this.user.email+" "+this.user.password);
        },
        getHours(time)
        {
            return time.split(":")[0];
        },
        getMinutes(time)
        {
            return time.split(":")[1];
        },
        //getGropusBy
        getGroupByDayAndTime(dday,ttime)
        {
            var group = {day:dday,name:"-",timeStart:"",timeEnd:""};

            for (i=0; i<this.groups.length; i++)
            {
                if(this.getHours(this.groups[i].timeStart)==this.getHours(ttime)&&this.groups[i].day==dday)
                {
                group=this.groups[i];
                }
            }
          
            return group;
        },
        getRowspan(group)
        {
            
            if(group.name!="-")
            {
            return this.getHours(group.timeEnd)-this.getHours(group.timeStart);/*(this.getTimeInterval(group.timeEnd,group.timeStart));*/
            }
            else
            {
                return 1;
            }
        },
        getTimeInterval(timeMore,timeLess)
        {
            hours = this.getHours(timeMore)-this.getHours(timeLess);
            if((this.getMinutes(timeMore)-this.getMinutes(timeLess))>=0)
            { 
                minutes = this.getMinutes(timeMore)-this.getMinutes(timeLess);
            }
             else
             {
                minutes = 60+((this.getMinutes(timeMore)-this.getMinutes(timeLess)));
                hours-=1;
             }
             return hours+":"+minutes;
        },
        addGroup(){
            this.groupsOriginal.push({day:this.newGroup.day,name:this.newGroup.name,timeStart:this.newGroup.timeStart,timeEnd:this.newGroup.timeEnd});
        }
        
    },
    computed:
    {
        groups()
        {
            var groupsContinued=[];
            var rowspan=0;
            for (i=0; i<this.groupsOriginal.length; i++)
            {
                groupsContinued.push(this.groupsOriginal[i]);
                rowspan = this.getRowspan(this.groupsOriginal[i]);
                if(rowspan>1)
                {
                    for (j=1; j<rowspan+1; j++)
                    {
                        groupsContinued.push({day:this.groupsOriginal[i].day,name:"continue",timeStart:(+this.getHours(this.groupsOriginal[i].timeStart)+j)+":00",timeEnd:(+this.getHours(this.groupsOriginal[i].timeStart)+j+1)+":00"});
                    }
                    
                }
            }
            return groupsContinued;
        },
        times()
        {
            var timesArray = [];
            for (hours=this.getHours(this.minStartTime);hours<this.getHours(this.maxEndTime);hours++) 
            {
                timesArray.push(hours+":00");
            }
            return timesArray;
        },
        doubleValue()
        {
            return this.value*2;
        },
        showMess()
        {
            return this.message.toUpperCase();
        },
        minStartTime()
        {
            var minStartTime="24:00";
            for (i = 0; i < this.groupsOriginal.length; i++) {
                if(+this.getHours(this.groupsOriginal[i].timeStart)<+this.getHours(minStartTime))
                {
                    minStartTime=this.groupsOriginal[i].timeStart;
                }
            }
            return minStartTime;
        },
        maxEndTime()
        {
            var maxEndTime="00:00";
            for (i = 0; i < this.groupsOriginal.length; i++) {
                if(+this.getHours(this.groupsOriginal[i].timeEnd)>+this.getHours(maxEndTime))
                {
                    maxEndTime=this.groupsOriginal[i].timeEnd;
                }
            }
            return maxEndTime;
        }


    },
    filters:
    {
        lowerCase(value)
        {
            return value.toLowerCase();
        }
    }
});
new Vue({
    el:"#app2"
})