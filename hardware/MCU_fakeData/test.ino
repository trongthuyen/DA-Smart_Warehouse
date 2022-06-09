#define CONDITION PD2
#define LED PD3
#define DOOR PD4
String incomingString;
int count = 0;
char str[] = "!1;TEMP:20;HUMI:30;LIGHT:300;GAS:20#";
void controlDevice(int state_condition, int state_led, int state_door){
    digitalWrite(CONDITION, state_condition);
    digitalWrite(LED, state_led);
    digitalWrite(DOOR, state_door);
}

int getTemp(){
  return random(20,35);
}

int getHumi(){
  return random(40,70);
}

int getLight(){
  return random(300,400);
}

int getGas(){
  return random(5,30);
}

void handleString(String sample){
  int len = sample.length();
  String temp[2];
  int value;
  int index = 0;
  for(int i = 0; i < len; i++){
    if(sample[i] == '!' || sample[i] == '#'){
      continue;
    }
    else if(sample[i] == ':'){
      index++;
    }
    else{
      temp[index] += sample[i];
    }
  }
  if(index <= 0) return;
  if(temp[0] == "C_CONDITION"){
      controlDevice((temp[1] == "0")?HIGH:LOW, HIGH, HIGH);
    }
  else if(temp[0] == "C_LED"){
      controlDevice(HIGH, (temp[1] == "1")?LOW:HIGH, HIGH);
    }
  else if(temp[0] == "C_DOOR"){
      controlDevice(HIGH, HIGH, (temp[1] == "1")?LOW:HIGH);
    }
}
void setup() {
  // put your setup code here, to run once:
  pinMode(CONDITION, OUTPUT);
  pinMode(LED, OUTPUT);
  pinMode(DOOR, OUTPUT);

  Serial.begin(115200);
  controlDevice(HIGH, HIGH, HIGH);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){
    incomingString = Serial.readString();
//    incomingString = "!C_CONDITION:0#";
    if(incomingString == "!GET#"){
      sprintf(str, "!%d;TEMP:%d;HUMI:%d;LIGHT:%d;GAS:%d#", ++count, getTemp(), getHumi(), getLight(), getGas());
      Serial.write(str);
    }
    else{
      handleString(incomingString);
    }
  }
}
