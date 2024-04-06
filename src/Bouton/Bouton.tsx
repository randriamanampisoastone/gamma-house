import "./Bouton.css";
import { HiLightBulb } from "react-icons/hi";
import { GiPowerButton } from "react-icons/gi";
import { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";
import toast from "react-hot-toast";

// Configuration du broker MQTT
const brokerUrl: string = "ws://broker.emqx.io:8083/mqtt";
const topic: string = "it/club/madagascar";
const message: string = "Hello, Stone!";

function Bouton(): JSX.Element {
  const [etatBouton, setEtatBouton] = useState(false);
  // Creer un etat pour stocker le client MQTT
  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(brokerUrl);
    mqttClient.on("connect", () => {
      mqttClient.subscribe(topic);
      console.log("Connected to MQTT broker");
      toast.success("Connexion reussi !");
      mqttClient.publish(topic, message);
      mqttClient.on('message',(topic, message)=>{
        toast.success(message.toString());
      });
    });
  
    setClient(mqttClient);
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  let changeEtatBouton = () => {
    setEtatBouton(!etatBouton);
    if (etatBouton) {
      client.publish(topic, "ON");
    } else {
      client.publish(topic, "OFF");
    }
  };
  return (
    <>
      <div className="bouton-container ">
        {etatBouton ? (
          <HiLightBulb className="light-icon" />
        ) : (
          <HiLightBulb className="dark-icon" />
        )}
        <div className="command-container ">
          <button onClick={changeEtatBouton} style={{ all: "unset" }}>
            {etatBouton ? (
              <GiPowerButton className="button-icon button-icon-red " />
            ) : (
              <GiPowerButton className="button-icon button-icon-green" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Bouton;
