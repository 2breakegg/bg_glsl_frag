// Author: break_egg
// Title: RayMarching_ball_plane

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// 最大步进次数
#define MAX_STEPS 100
// 最大步进距离 相当于 camera.far
#define MAX_DIST 100.
// 最小距离, 小于此距离, 视为相交
#define SURF_DIST.01

// sphere.xyz 球的坐标 sphere.w 球的半径
float getSphereDis(vec4 sphere,vec3 p){
    return length(sphere.xyz-p)-sphere.w;
}

float getBoxDis(vec3 boxPos,vec4 quat,vec3 boxSize,vec3 p){
    // vec4 q = quat;
    float x=quat.x;
    float y=quat.y;
    float z=quat.z;
    float w=quat.w;
    vec3 b=boxPos;
    vec3 pn=vec3(0);
    pn.x=(1.-2.*y*y-2.*z*z)*(p.x-b.x)+(2.*x*y+2.*w*z)*(p.y-b.y)+(2.*x*z-2.*w*y)*(p.z-b.z);
    pn.y=(2.*x*y-2.*w*z)*(p.x-b.x)+(1.-2.*x*x-2.*z*z)*(p.y-b.y)+(2.*y*z+2.*w*x)*(p.z-b.z);
    pn.z=(2.*x*z+2.*w*y)*(p.x-b.x)+(2.*y*z-2.*w*x)*(p.y-b.y)+(1.-2.*x*x-2.*y*y)*(p.z-b.z);
    
    float dx=abs(pn.x)-boxSize.x;
    float dy=abs(pn.y)-boxSize.y;
    float dz=abs(pn.z)-boxSize.z;
    
    return max(max(max(dx,dy),dz),0.);
}

float getDis(vec3 p){
    float d_plane=p.y+2.;
    
    float d_sphere=getSphereDis(vec4(0,1,4,1),p);
    
    float angle = u_time;
    
    float d_box=getBoxDis(vec3(-7,1.5,3),
    normalize(vec4(0,sin(angle/2.),0,cos(angle/2.))),vec3(1,1,1),p);
    
    float d=min(d_plane,d_sphere);
    d=min(d_box,d);
    // d = d_box+d_plane+d_sphere;
    return d;
}

float rayMarch(vec3 ro,vec3 rd){
    float d=0.;
    for(int i=0;i<MAX_STEPS;i++){
        vec3 p=ro+rd*d;
        float dS=getDis(p);
        d+=dS;
        if(d>MAX_DIST||dS<SURF_DIST){
            break;
        }
    }
    return d;
}

void main(){
    vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    
    vec3 col=vec3(0);
    
    vec3 ro=vec3(0,0,-10);
    vec3 rd=vec3(uv.x,uv.y,1);
    
    float d=rayMarch(ro,rd)/15.;
    // d=step(d,0.4);
    col+=d;
    
    gl_FragColor=vec4(col,1.);
}