#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>

// PLANT CONFIG
const String plantId = "sdfsdf";

// WIFI CONFIGURATION
WiFiSSLClient wifi;

char ssid[] = "HUAWEI P30 Pro"; 
char pass[] = "12345678";
int status = WL_IDLE_STATUS;

// HTTP CLIENT CONFIG
const char serverName[] = "arroseur2000.vercel.app";
int port = 443;
HttpClient client = HttpClient( wifi, serverName, port );

// WATER LEVEL SENSOR CONFIG
#define POWER_PIN_WATER_LEVEL_SENSOR  9
#define SIGNAL_PIN_WATER_LEVEL_SENSOR A0
int waterLevelValue = 0;

// SOIL MOISTURE SENSOR CONFIG
#define POWER_PIN_SOIL_MOISTURE_SENSOR 8
#define SIGNAL_PIN_SOIL_MOISTURE_SENSOR A1
const int dryValue = 680;  
const int wetValue = 350;
int soilMoistureValue = 0;
int soilMoisturePercent = 0;

// LUMINOSITY SENSOR CONFIG
#define POWER_PIN_LIGHT_SENSOR 6
#define SIGNAL_PIN_LIGHT_SENSOR A2
int luminosityValue = 0;

// HUMIDITY & TEMPERATURE SENSOR CONFIG
#include "DHT.h"
#define DHTPIN 7
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  while (!Serial);

  pinMode(POWER_PIN_WATER_LEVEL_SENSOR, OUTPUT);
  digitalWrite(POWER_PIN_WATER_LEVEL_SENSOR, LOW);

  pinMode(POWER_PIN_SOIL_MOISTURE_SENSOR, OUTPUT);
  digitalWrite(SIGNAL_PIN_SOIL_MOISTURE_SENSOR, LOW);

  pinMode(POWER_PIN_LIGHT_SENSOR, OUTPUT);
  digitalWrite(SIGNAL_PIN_LIGHT_SENSOR, LOW);

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

  if (waterLevelValue <= 100) {
    Serial.print("🥛 Water Level: Empty");
  } else if (waterLevelValue > 100 && waterLevelValue <= 300) {
    Serial.print("🥛 Water Level: Low");
  } else if (waterLevelValue > 300 && waterLevelValue <= 330) {
    Serial.print("🥛 Water Level: Medium");
  } else if (waterLevelValue > 330) {
    Serial.print("🥛 Water Level: High");
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
  Serial.println(luminosityValue);

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
  Serial.println("Posting Data...");

  // Post Data
  String contentType = "application/json";
  String data = "{\"plantId\": \"" + plantId + "\",\"humidity\": " + humidityValue + ",\"luminosity\": " + luminosityValue +  ",\"soilMoisture\": " + soilMoistureValue + ",\"waterLevelToLow\": true,\"temperature\": " + temperatureValue + "}";

  client.post("/api/plantLog", contentType, data );

  // Read the status code and body of the response
  int statusCode = client.responseStatusCode();
  Serial.print( "Status code: " );
  Serial.println( statusCode );
  String response = client.responseBody();
  Serial.print( "Response: " );
  Serial.println( response );

  Serial.println( "Wait 10 seconds" );
  delay(10000);

  Serial.println("");
  Serial.println("------------");
}