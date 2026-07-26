import React, { useState, useEffect, useRef } from 'react';
import { type Language } from '../data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Helicopter, Car, ShieldCheck } from 'lucide-react';

interface ArchitectProps {
  language: Language;
  currency: string;
  onBookCustomRoute: (route: CityNode[], transport: TransportOption) => void;
}

interface CityNode {
  id: string;
  name: { en: string; fr: string; ar: string };
  lat: number;
  lng: number;
}

interface TransportOption {
  id: string;
  name: { en: string; fr: string; ar: string };
  multiplier: number;
  icon: any;
}

const CITIES: CityNode[] = [
  { id: 'tng', name: { en: "Tangier", fr: "Tanger", ar: "طنجة" }, lat: 35.7595, lng: -5.8340 },
  { id: 'chf', name: { en: "Chefchaouen", fr: "Chefchaouen", ar: "شفشاون" }, lat: 35.1688, lng: -5.2636 },
  { id: 'rba', name: { en: "Rabat", fr: "Rabat", ar: "الرباط" }, lat: 34.0209, lng: -6.8416 },
  { id: 'cmn', name: { en: "Casablanca", fr: "Casablanca", ar: "الدار البيضاء" }, lat: 33.5731, lng: -7.5898 },
  { id: 'mek', name: { en: "Meknes", fr: "Meknès", ar: "مكناس" }, lat: 33.8938, lng: -5.5547 },
  { id: 'fes', name: { en: "Fes", fr: "Fès", ar: "فاس" }, lat: 34.0331, lng: -5.0003 },
  { id: 'rak', name: { en: "Marrakech", fr: "Marrakech", ar: "مراكش" }, lat: 31.6295, lng: -7.9811 },
  { id: 'esu', name: { en: "Essaouira", fr: "Essaouira", ar: "الصويرة" }, lat: 31.5085, lng: -9.7595 },
  { id: 'aga', name: { en: "Agadir", fr: "Agadir", ar: "أكادير" }, lat: 30.4278, lng: -9.5981 },
  { id: 'our', name: { en: "Ouarzazate", fr: "Ouarzazate", ar: "ورزازات" }, lat: 30.9189, lng: -6.9118 },
  { id: 'mer', name: { en: "Merzouga", fr: "Merzouga", ar: "مرزوقة" }, lat: 31.0983, lng: -4.0033 }
];

const TRANSPORTS: TransportOption[] = [
  { id: 'vclass', name: { en: "Mercedes V-Class Chauffeur", fr: "Chauffeur Mercedes Classe V", ar: "سائق مرسيدس فئة V" }, multiplier: 2.5, icon: Car },
  { id: 'heli', name: { en: "Private Helicopter VIP", fr: "Hélicoptère Privé VIP", ar: "هليكوبتر خاصة VIP" }, multiplier: 15, icon: Helicopter }
];

export const RoyalItineraryArchitect: React.FC<ArchitectProps> = ({ language, onBookCustomRoute }) => {
  const [route, setRoute] = useState<CityNode[]>([CITIES[3], CITIES[6]]); // Default: Casa -> Marrakech
  const [transport, setTransport] = useState<TransportOption>(TRANSPORTS[0]);
  const [distance, setDistance] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const isRTL = language === 'ar';

  // Calculate real distance using Haversine formula
  useEffect(() => {
    let dist = 0;
    const toRad = (val: number) => (val * Math.PI) / 180;
    for (let i = 0; i < route.length - 1; i++) {
      const lat1 = route[i].lat;
      const lon1 = route[i].lng;
      const lat2 = route[i + 1].lat;
      const lon2 = route[i + 1].lng;

      const R = 6371; // km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      dist += R * c;
    }
    setDistance(Math.round(dist));
  }, [route]);

  // Load Leaflet Script and CSS dynamically
  useEffect(() => {
    if ((window as any).L) {
      setMapLoaded(true);
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup loaded scripts/styles if needed (optional)
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapLoaded || !(window as any).L) return;
    const L = (window as any).L;

    if (!mapRef.current) {
      mapRef.current = L.map('leaflet-map', {
        center: [32.0, -6.0],
        zoom: 6,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapLoaded]);

  // Update Markers & Polylines on Route / Language change
  useEffect(() => {
    if (!mapRef.current || !(window as any).L) return;
    const L = (window as any).L;

    // Clear existing markers and lines
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    // Add markers
    route.forEach((city, idx) => {
      const isFirstOrLast = idx === 0 || idx === route.length - 1;
      
      const customHtml = `
        <div style="
          position: relative;
          width: 16px;
          height: 16px;
          background-color: #c5a059;
          border-radius: 50%;
          border: 2px solid #FFF;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${isFirstOrLast ? `
            <div style="
              position: absolute;
              width: 32px;
              height: 32px;
              border: 1px solid #c5a059;
              border-radius: 50%;
              animation: nodePulse 2s infinite;
              pointer-events: none;
            "></div>
          ` : ''}
          <span style="
            position: absolute;
            top: -22px;
            font-size: 10px;
            font-weight: bold;
            background: #0b3a24;
            color: #fff;
            padding: 1px 5px;
            border-radius: 4px;
            white-space: nowrap;
          ">${idx + 1}</span>
        </div>
      `;

      const markerIcon = L.divIcon({
        className: 'luxury-map-marker',
        html: customHtml,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker([city.lat, city.lng], { icon: markerIcon })
        .bindTooltip(city.name[language], {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
          className: 'luxury-map-tooltip'
        })
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });

    // Draw route lines
    if (route.length > 1) {
      const latlngs = route.map(c => [c.lat, c.lng]);
      polylineRef.current = L.polyline(latlngs, {
        color: '#c5a059',
        weight: 3,
        opacity: 0.8,
        dashArray: '5, 10'
      }).addTo(mapRef.current);

      // Fit map bounds to show full route
      mapRef.current.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
    }
  }, [route, mapLoaded, language]);

  const addCity = (cityId: string) => {
    const city = CITIES.find(c => c.id === cityId);
    if (city && !route.find(c => c.id === cityId)) {
      setRoute([...route, city]);
    }
  };

  const removeCity = (index: number) => {
    const newRoute = [...route];
    newRoute.splice(index, 1);
    setRoute(newRoute);
  };

  const getEstimatedPrice = () => {
    const base = route.length * 500;
    const travelCost = distance * transport.multiplier;
    return base + travelCost;
  };

  const availableCities = CITIES.filter(c => !route.find(rc => rc.id === c.id));

  return (
    <section id="itinerary-architect" className="section-padding" style={{ backgroundColor: '#030806', position: 'relative' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: 'var(--gold-royal)', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>
          {language === 'ar' ? 'تصميم الرحلات الملكية' : language === 'fr' ? 'Concepteur d\'Itinéraire Royal' : 'The Royal Itinerary Architect'}
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#FFFFFF', lineHeight: '1.2' }}>
          {language === 'ar' ? 'ارسم مسار رحلتك الخاصة' : language === 'fr' ? 'Dessinez Votre Voyage Sur Mesure' : 'Design Your Bespoke Journey'}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '24px auto 0', width: '200px' }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, var(--gold-royal))' }} />
          <span style={{ color: 'var(--gold-royal)', fontSize: '0.75rem' }}>✦</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, var(--gold-royal))' }} />
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px'
      }} className="architect-grid">

        {/* Left Side: Real Leaflet Map */}
        <div style={{
          backgroundColor: 'rgba(5, 14, 10, 0.8)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(11, 58, 36, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '550px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div 
            id="leaflet-map" 
            style={{ 
              width: '100%', 
              height: '526px', 
              borderRadius: '8px', 
              backgroundColor: '#030806',
              zIndex: 5
            }} 
          />
        </div>

        {/* Right Side: Itinerary Builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Builder Panel */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '30px',
            textAlign: isRTL ? 'right' : 'left'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: '#FFF', marginBottom: '20px' }}>
              {language === 'ar' ? 'مسار الرحلة' : language === 'fr' ? 'Itinéraire de Voyage' : 'Journey Path'}
            </h3>

            {/* Selected Cities Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <AnimatePresence>
                {route.map((city, idx) => (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(197, 160, 89, 0.1)',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--gold-royal)', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {idx + 1}
                      </div>
                      <span style={{ fontSize: '1.05rem', color: '#FFF', fontWeight: '500' }}>{city.name[language]}</span>
                    </div>
                    
                    <button
                      onClick={() => removeCity(idx)}
                      disabled={route.length <= 1}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: route.length <= 1 ? 'rgba(255,255,255,0.2)' : '#EF4444',
                        cursor: route.length <= 1 ? 'not-allowed' : 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add City Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                {language === 'ar' ? 'إضافة وجهة' : language === 'fr' ? 'Ajouter une destination' : 'Add Destination'}
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                {availableCities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => addCity(city.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.8)',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#FFF'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  >
                    <Plus size={14} />
                    {city.name[language]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Transport & Stats Panel */}
          <div style={{
            backgroundColor: 'rgba(11, 58, 36, 0.4)',
            border: '1px solid var(--emerald-light)',
            borderRadius: 'var(--radius-md)',
            padding: '30px',
            textAlign: isRTL ? 'right' : 'left'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-royal)', marginBottom: '20px' }}>
              {language === 'ar' ? 'الخدمات اللوجستية الفاخرة' : language === 'fr' ? 'Logistique de Luxe' : 'Luxury VIP Logistics'}
            </h3>

            {/* Transport Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {TRANSPORTS.map(opt => {
                const Icon = opt.icon;
                const isSelected = transport.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTransport(opt)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.2)' : 'rgba(0,0,0,0.3)',
                      border: isSelected ? '1px solid var(--gold-royal)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: isSelected ? '#FFF' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Icon size={28} style={{ color: isSelected ? 'var(--gold-royal)' : 'inherit' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '500', textAlign: 'center' }}>{opt.name[language]}</span>
                  </button>
                );
              })}
            </div>

            {/* Stats Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {language === 'ar' ? 'المسافة الإجمالية' : language === 'fr' ? 'Distance Totale' : 'Total Distance'}
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#FFF', fontFamily: 'monospace' }}>
                  {distance} <span style={{ fontSize: '0.9rem', color: 'var(--gold-royal)' }}>KM</span>
                </div>
              </div>
              
              <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  {language === 'ar' ? 'التكلفة التقديرية' : language === 'fr' ? 'Coût Estimé' : 'Est. Investment'}
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#FFF', fontFamily: 'monospace' }}>
                  $ {getEstimatedPrice().toLocaleString()}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onBookCustomRoute(route, transport)}
              disabled={route.length < 2}
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '16px',
                backgroundColor: route.length >= 2 ? 'var(--gold-royal)' : 'rgba(255,255,255,0.1)',
                color: route.length >= 2 ? '#000' : 'rgba(255,255,255,0.3)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: route.length >= 2 ? 'pointer' : 'not-allowed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s',
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }}
              className={route.length >= 2 ? 'btn-gold' : ''}
            >
              <ShieldCheck size={18} />
              {language === 'ar' ? 'طلب الحجز الملكي' : language === 'fr' ? 'Demander la Réservation Royale' : 'Request Royal Booking'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              {language === 'ar' ? 'مستشار السفر الخاص بك سيتواصل معك لتأكيد المسار' : language === 'fr' ? 'Votre concierge vous contactera pour confirmer.' : 'Your private concierge will contact you to confirm details.'}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .architect-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
