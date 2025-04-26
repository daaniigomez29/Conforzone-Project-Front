import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthUserService } from "../services/auth-user.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const authGuard: CanMatchFn = (route, segments) => {
    const authService = inject(AuthUserService)
    const router = inject(Router)

    return authService.isAuthenticated() ? true : router.navigateByUrl("/login") //Si el usuario ha iniciado sesión se le deja pasar, si no, tendrá que iniciar sesión
}

