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

float GetDist(vec3 p){
    vec4 s=vec4(0,1,6,1);
    
    float sphereDist=length(p-s.xyz)-s.w;
    // sphereDist = MAX_DIST;
    float planeDist=p.y;
    
    float d=min(sphereDist,planeDist);
    return d;
}

float RayMarch(vec3 ro,vec3 rd){
    // 相机到步进点的距离
    float dO=0.;
    for(int i=0;i<MAX_STEPS;i++){
        // 步进点 坐标
        vec3 p=ro+rd*dO;
        // 步进点 坐标 到其他几何体的最近距离
        float dS=GetDist(p);
        // 步长增长
        dO+=dS;
        if(dO>MAX_DIST||dS<SURF_DIST)break;
    }
    return dO;
}

vec3 GetNormal(vec3 p){
    float d=GetDist(p);
    vec3 n=normalize(d-vec3(
            GetDist(p-vec3(.01,0,0)),
            GetDist(p-vec3(.0,.01,.0)),
            GetDist(p-vec3(.0,0,.01))
        )
    );
    return n;
}

float GetLight(vec3 p){ 
    vec3 lightPos=vec3(0,5,6);
    lightPos.xz+=vec2(sin(u_time),cos(u_time));
    vec3 l=normalize(lightPos-p);
    vec3 n=GetNormal(p);
    
    float shadow = step(RayMarch(p+n*SURF_DIST,l)-length(lightPos-p),0.1); 
    
    float dif=clamp(dot(n,l),0.,1.)*(1.-shadow*0.9);
    
    return dif;
}

void main(){
    vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    
    vec3 col=vec3(0);
    
    // 相机位置
    vec3 ro=vec3(0,1,0);
    // 相机朝向
    vec3 rd=normalize(vec3(uv.x,uv.y,1.));
    
    float d=RayMarch(ro,rd);
    
    vec3 p=ro+d*rd;
    float light=GetLight(p);
    
    col=vec3(light);
    
    gl_FragColor=vec4(col,1.);
}