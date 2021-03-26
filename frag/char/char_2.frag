// Author: break_egg
// Title: char_0

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float dot2( in vec2 v ) { return dot(v,v); }
float sdBezier( in vec2 pos, in vec2 A, in vec2 B, in vec2 C )
{   
    float size=20.;
    pos *= size;
    A *= size;
    B *= size;
    C *= size;
    vec2 a = B - A;
    vec2 b = A - 2.0*B + C;
    vec2 c = a * 2.0;
    vec2 d = A - pos;
    float kk = 1.0/dot(b,b);
    float kx = kk * dot(a,b);
    float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
    float kz = kk * dot(d,a);      
    float res = 0.0;
    float p = ky - kx*kx;
    float p3 = p*p*p;
    float q = kx*(2.0*kx*kx-3.0*ky) + kz;
    float h = q*q + 4.0*p3;
    if( h >= 0.0) 
    { 
        h = sqrt(h);
        vec2 x = (vec2(h,-h)-q)/2.0;
        vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
        float t = clamp( uv.x+uv.y-kx, 0.0, 1.0 );
        res = dot2(d + (c + b*t)*t);
    }
    else
    {
        float z = sqrt(-p);
        float v = acos( q/(p*z*2.0) ) / 3.0;
        float m = cos(v);
        float n = sin(v)*1.732050808;
        vec3  t = clamp(vec3(m+m,-n-m,n-m)*z-kx,0.0,1.0);
        res = min( dot2(d+(c+b*t.x)*t.x), dot2(d+(c+b*t.y)*t.y) );
    }
    return sqrt( res );
}

float char_2_1(vec2 uv){
    vec2 uv2= uv * vec2(0.5,-0.5) + vec2(0.5,0.5);
    vec2 p0 = vec2(0.31,.23);
    vec2 p1 = vec2(0.48, .10);
    vec2 p2 = vec2(0.62,.25);
    
    vec2 p3 = vec2(0.75,.4);
    vec2 p4 = vec2(0.33,.83);
    
    vec2 p5 = vec2(0.7,.83);
    
    float f = sdBezier(uv2,p0,p1,p2);
    f = min(sdBezier(uv2,p2,p3,p4),f);
    f = min(sdBezier(uv2,p4,p5,p5),f);
    f = smoothstep(0.1, .3, 1.-f);
    return f;
}


void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec2 uv=st*2.-1.;
    
    vec3 color=vec3(char_2_1(uv*2.+vec2(1.,-1.)));
    // vec3 color=vec3(char_2_1(uv));
    
    gl_FragColor=vec4(color,1.);
}