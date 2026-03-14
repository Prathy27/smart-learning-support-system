import React, { useEffect, useState } from "react";
import './Regiss.css';

const Admin = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
const endpoints = ["http://localhost:8088/api/register/viewall"];


    let mounted = true;

    // try localStorage first (useful when backend doesn't expose a GET)
    try {
      const stored = JSON.parse(localStorage.getItem("students") || "null");
      if (Array.isArray(stored) && stored.length > 0) {
        setStudents(stored);
        setLoading(false);
        return;
      }
    } catch (e) {
      // ignore and try fetch
    }

    const tryFetch = async () => {
      setLoading(true);
      setError(null);
      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          if (!mounted) return;
          // ensure array
          if (Array.isArray(data)) {
            setStudents(data);
            setLoading(false);
            return;
          }
          // sometimes backend wraps in object
          if (data && Array.isArray(data.users)) {
            setStudents(data.users);
            setLoading(false);
            return;
          }
        } catch (err) {
          // try next endpoint
        }
      }

      // final fallback: try localStorage again
      try {
        const stored2 = JSON.parse(localStorage.getItem("students") || "null");
        if (Array.isArray(stored2) && stored2.length > 0) {
          setStudents(stored2);
          setLoading(false);
          return;
        }
      } catch (e) {
        // ignore
      }

      if (mounted) {
        setError("Unable to fetch student list from backend.");
        setLoading(false);
      }
    };

    tryFetch();

    return () => { mounted = false };
  }, []);

  if (loading) return <div style={{padding:20}}>Loading students...</div>;
  if (error) return <div style={{padding:20,color:'red'}}>{error}</div>;

  return (
    <div className="regis-container" style={{padding:20}}>
      <h2 style={{color:"black"}}>Registered Students</h2>
      {students.length === 0 ? (
        <div>No registered students found.</div>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th style={{border:'1px solid #ccc',padding:8,textAlign:'left'}}>Name</th>
                <th style={{border:'1px solid #ccc',padding:8,textAlign:'left'}}>Email</th>
                <th style={{border:'1px solid #ccc',padding:8,textAlign:'left'}}>Phone</th>
                <th style={{border:'1px solid #ccc',padding:8,textAlign:'left'}}>DOB</th>
                <th style={{border:'1px solid #ccc',padding:8,textAlign:'left'}}>Class</th>
                <th style={{border:'1px solid #ccc',padding:8,textAlign:'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={s.id || s.email || idx}>
                  <td style={{border:'1px solid #eee',padding:8}}>{s.name || s.studentName || '-'}</td>
                  <td style={{border:'1px solid #eee',padding:8}}>{s.email || '-'}</td>
                  <td style={{border:'1px solid #eee',padding:8}}>{s.ph || s.phone || '-'}</td>
                  <td style={{border:'1px solid #eee',padding:8}}>{s.date || s.dob || '-'}</td>
                  <td style={{border:'1px solid #eee',padding:8}}>{s.studentClass || s.class || '-'}</td>
                  <td style={{border:'1px solid #eee',padding:8,textAlign:'center'}}>
                    <button
                      onClick={async () => {
                        const ok = window.confirm(`Remove student ${s.name || s.email || ''}?`);
                        if (!ok) return;

                        // attempt backend deletion (try multiple plausible endpoints)
                        const idOrEmail = s.id || s._id || s.email;
                        const delEndpoints = [
                          idOrEmail ? `http://localhost:8088/api/register/${idOrEmail}` : null,
                          idOrEmail ? `http://localhost:8088/api/register/delete/${idOrEmail}` : null,
                          idOrEmail ? `http://localhost:8088/users/${idOrEmail}` : null,
                          idOrEmail ? `http://localhost:8088/api/users/${idOrEmail}` : null,
                        ].filter(Boolean);

                        let backendDeleted = false;
                        for (const url of delEndpoints) {
                          try {
                            const res = await fetch(url, { method: "DELETE" });

                            if (res.ok) { backendDeleted = true; break; }
                          } catch (e) {
                            // ignore and try next
                          }
                        }
                      
                        // remove from UI and localStorage regardless
                        setStudents(prev => {
                          const next = prev.filter((_, i) => i !== idx);
                          try { localStorage.setItem('students', JSON.stringify(next)); } catch(e){}
                          return next;
                        });

                        if (backendDeleted) {
                          alert('Student removed (backend).');
                        } else {
                          alert('Student removed locally. Backend deletion may not be available.');
                        }
                      }}
                      style={{background:'#e74c3c',color:'#fff',border:'none',padding:'6px 10px',borderRadius:6,cursor:'pointer'}}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
