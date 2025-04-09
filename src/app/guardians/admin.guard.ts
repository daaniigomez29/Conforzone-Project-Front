import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthUserService } from "../services/auth-user.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const adminGuard: CanMatchFn = (route, segments) => {
    const authService = inject(AuthUserService)
    const router = inject(Router)

    return authService.isAdmin() ? true : router.navigateByUrl("/login") //Si el usuario es administrador le deja pasar, si no lo es, tiene que iniciar sesión
}