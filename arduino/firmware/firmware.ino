#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>

// PLANT CONFIG
const String plantId = "sdfsdf";

// WIFI CONFIG
WiFiSSLClient wifi;

char ssid[] = "HUAWEI P30 Pro"; 
char pass[] = "12345678";
int status = WL_IDLE_STATUS;

// HTTP CLIENT CONFIG
const char serverName[] = "arroseur2000.vercel.app";
int port = 443;
HttpClient client = HttpClient( wifi, serverName, port );

// JSON CONFIG
StaticJsonDocument<128> jsonDoc;

// WATER LEVEL SENSOR CONFIG
#define POWER_PIN_WATER_LEVEL_SENSOR  6
#define SIGNAL_PIN_WATER_LEVEL_SENSOR A4
int waterLevelValue = 0;
String waterLevelToLow = "false";

// SOIL MOISTURE SENSOR CONFIG
#define POWER_PIN_SOIL_MOISTURE_SENSOR 9
#define SIGNAL_PIN_SOIL_MOISTURE_SENSOR A0
const int dryValue = 680;  
const int wetValue = 340;
int soilMoistureValue = 0;
int soilMoisturePercent = 0;

// LUMINOSITY SENSOR CONFIG
#define POWER_PIN_LIGHT_SENSOR 8
#define SIGNAL_PIN_LIGHT_SENSOR A1
int luminosityValue = 0;
int luminosityPercent = 0;
const int highLuminosityValue = 1000;  
const int lowLuminosityValue = 0;

// HUMIDITY & TEMPERATURE SENSOR CONFIG
#include "DHT.h"

#define DHTPIN 3
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// WATER PUMP
#define POWER_PIN_WATER_PUMP 2
int wateringTime = 0;

void setup() {
  //Serial.begin(9600);
  //while (!Serial);

  pinMode(POWER_PIN_WATER_LEVEL_SENSOR, OUTPUT);
  digitalWrite(POWER_PIN_WATER_LEVEL_SENSOR, LOW);

  pinMode(POWER_PIN_SOIL_MOISTURE_SENSOR, OUTPUT);
  digitalWrite(SIGNAL_PIN_SOIL_MOISTURE_SENSOR, LOW);

  pinMode(POWER_PIN_LIGHT_SENSOR, OUTPUT);
  digitalWrite(SIGNAL_PIN_LIGHT_SENSOR, LOW);

  pinMode(POWER_PIN_WATER_PUMP, OUTPUT);
  digitalWrite(POWER_PIN_WATER_PUMP, LOW);

  dht.begin();

  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to network: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }

  Serial.println("✅ You're connected to the network!");
  Serial.println("---------------------------------------");
}


void loop() {
  // WATER LEVEL SENSOR
  digitalWrite(POWER_PIN_WATER_LEVEL_SENSOR, HIGH);
  delay(100);
  waterLevelValue = analogRead(SIGNAL_PIN_WATER_LEVEL_SENSOR);
  digitalWrite(POWER_PIN_WATER_LEVEL_SENSOR, LOW);

  if (waterLevelValue <= 150) {
    Serial.print("🥛 Water Level: Empty");
    waterLevelToLow = "true";
  } else if (waterLevelValue > 150 && waterLevelValue <= 170) {
    Serial.print("🥛 Water Level: Low");
    waterLevelToLow = "true";
  } else if (waterLevelValue > 170 && waterLevelValue <= 190) {
    Serial.print("🥛 Water Level: Medium");
    waterLevelToLow = "false";
  } else if (waterLevelValue > 190) {
    Serial.print("🥛 Water Level: High");
    waterLevelToLow = "false";
  }

  Serial.print(" (");
  Serial.print(waterLevelValue);
  Serial.print(")");
  Serial.println("");

  // SOIL MOISTURE SENSOR
  digitalWrite(POWER_PIN_SOIL_MOISTURE_SENSOR, HIGH);
  delay(100);
  soilMoistureValue = analogRead(SIGNAL_PIN_SOIL_MOISTURE_SENSOR);
  digitalWrite(POWER_PIN_SOIL_MOISTURE_SENSOR, LOW);

  soilMoisturePercent = map(soilMoistureValue, dryValue, wetValue, 0, 100);
  Serial.print("🪴 Soil Moisture: ");
  
  if (soilMoistureValue <= wetValue) {
    Serial.print("Bad Value - Sensor may be disconnected");
  } else if (soilMoisturePercent >= 100) {
    Serial.print("100 %");
  } else if (soilMoisturePercent <= 0) {
    Serial.print("0 %");
  } else if (soilMoisturePercent > 0 && soilMoisturePercent < 100) {
    Serial.print(soilMoisturePercent);
    Serial.print("%");
  }

  Serial.print(" (");
  Serial.print(soilMoistureValue);
  Serial.print(")");
  Serial.println("");

  // LUMINOSITY SENSOR
  Serial.print("💡 Luminosity: ");
  digitalWrite(POWER_PIN_LIGHT_SENSOR, HIGH);
  delay(100);
  luminosityValue = analogRead(SIGNAL_PIN_LIGHT_SENSOR);
  digitalWrite(POWER_PIN_LIGHT_SENSOR, LOW);
  
  luminosityPercent = map(luminosityValue, lowLuminosityValue, highLuminosityValue, 0, 100);

  Serial.print(luminosityPercent);
  Serial.print("% (");
  Serial.print(luminosityValue);
  Serial.println(")");

  // HUMIDITY AND TEMPERATURE 
  float humidityValue = dht.readHumidity();
  float temperatureValue = dht.readTemperature();

  if (isnan(humidityValue) || isnan(temperatureValue)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    delay(1000);
    return;
  }

  Serial.print(F("💦 Humidity: "));
  Serial.print(humidityValue);
  Serial.println("%");
  Serial.print(F("🌡️ Temperature: "));
  Serial.print(temperatureValue);
  Serial.println(F("°C"));

  Serial.println("");
  Serial.println("📮 Posting Data...");
  Serial.println("");

  // Post Data
  String contentType = "application/json";
  String data = "{\"plantId\": \"" + plantId + "\",\"humidity\": " + round(humidityValue) + ",\"luminosity\": " + round(luminosityPercent) +  ",\"soilMoisture\": " + round(soilMoisturePercent) + ",\"waterLevelToLow\":" + waterLevelToLow + ",\"temperature\": " + round(temperatureValue) + "}";

  client.post("/api/plantLog", contentType, data );

  // Read the status code and body of the response
  int statusCode = client.responseStatusCode();
  Serial.print( "Status code: " );
  Serial.println( statusCode );
  String response = client.responseBody();
  Serial.print( "Response: " );
  Serial.println( response );

  DeserializationError error = deserializeJson(jsonDoc, response);

  bool needToWater = jsonDoc["needToWater"];
  int waterQuantity = jsonDoc["waterQuantity"];

  Serial.println("");
  if(needToWater) {
    Serial.println("Watering... 🚰");

    wateringTime = (waterQuantity * 60) / 39;

    digitalWrite(POWER_PIN_WATER_PUMP, HIGH);
    delay(wateringTime * 1000);
    digitalWrite(POWER_PIN_WATER_PUMP, LOW);
  
    Serial.println("Done watering.");
  } else {
    Serial.println("J'ai pu soif c bon 👍");
  }
  Serial.println(""); 
  
  Serial.println( "Wait 10 seconds" );
  delay(10000);

  Serial.println("");
  Serial.println("------------");
}