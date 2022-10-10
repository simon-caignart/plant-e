#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>

//please enter your sensitive data in the Secret tab
WiFiSSLClient wifi;

char ssid[] = "HUAWEI P30 Pro";                // your network SSID (name)
char pass[] = "12345678";                // your network password (use for WPA, or use as key for WEP)
int status = WL_IDLE_STATUS;             // the Wi-Fi radio's status

const char serverName[] = "arroseur2000.vercel.app";  // server name
int port = 443;
HttpClient client = HttpClient( wifi, serverName, port );

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial);

  // attempt to connect to Wi-Fi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to network: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }

  // you're connected now, so print out the data:
  Serial.println("You're connected to the network");
  Serial.println("---------------------------------------");
}

void loop() {
  String contentType = "application/json";
  String postData = "{\"plantId\": \"sdfsdf\",\"humidity\": 14,\"luminosity\": 49,\"soilMoisture\": 23,\"waterLevelToLow\": true,\"temperature\": 28}";

  Serial.println(client.post( "/api/plantLog", contentType, postData ));

  // read the status code and body of the response
  
  int statusCode = client.responseStatusCode();
  Serial.print( "Status code: " );
  Serial.println( statusCode );
  String response = client.responseBody();
  Serial.print( "Response: " );
  Serial.println( response );

  Serial.println( "Wait 3 minutes" );
  delay( 10000 );
}